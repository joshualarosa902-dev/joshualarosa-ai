#!/usr/bin/env python3
"""Extract clean article HTML (teaser + gated rest) from each legacy lead-magnet
guide and write lib/guideContent.json for the hub's metered-paywall pages."""
import json, os, re
from html.parser import HTMLParser

REG = os.path.expanduser("~/lead-magnets/lead-magnets.json")
OUT = os.path.join(os.path.dirname(__file__), "..", "lib", "guideContent.json")

ALLOWED = {"h2": "h3", "h3": "h4", "h4": "h4", "p": "p", "ul": "ul", "ol": "ol",
           "li": "li", "blockquote": "blockquote", "strong": "strong", "b": "strong",
           "em": "em", "i": "em", "code": "code", "br": "br"}
SKIP_CLASSES = ("page-header", "page-footer", "section-number", "section-label")
LABEL_CLASSES = ("key-point-label",)

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sections = []      # list of html strings (one per content page)
        self.lede = ""
        self.buf = []
        self.stack = []         # roles: content/cover/cta/skip/unwrap/label
        self.skip = 0
        self.in_content = False
        self.in_cover = False
        self.cap_lede = False

    def cls_of(self, attrs):
        for k, v in attrs:
            if k == "class":
                return v
        return ""

    def handle_starttag(self, tag, attrs):
        cls = self.cls_of(attrs)
        if tag == "div":
            toks = cls.split()
            if "cover" in toks:
                self.stack.append("cover"); self.in_cover = True; return
            if "cta-page" in toks:
                self.stack.append("cta"); self.skip += 1; return
            if any(c in toks for c in SKIP_CLASSES):
                self.stack.append("skip"); self.skip += 1; return
            if "page" in toks:  # content page
                self.stack.append("content"); self.in_content = True; self.buf = []; return
            if any(c in toks for c in LABEL_CLASSES):
                self.stack.append("label")
                if self.skip == 0 and self.in_content: self.buf.append("<strong>")
                return
            self.stack.append("unwrap"); return  # tip-box, key-point, step, etc.
        if self.in_cover and tag in ("p", "span") and "cover-subtitle" in cls:
            self.cap_lede = True; return
        if self.skip == 0 and self.in_content and tag in ALLOWED:
            self.buf.append(f"<{ALLOWED[tag]}>")

    def handle_endtag(self, tag):
        if tag == "div":
            role = self.stack.pop() if self.stack else None
            if role == "content":
                self.in_content = False
                html = "".join(self.buf).strip()
                if html: self.sections.append(html)
            elif role == "cover":
                self.in_cover = False
            elif role in ("cta", "skip"):
                self.skip -= 1
            elif role == "label":
                if self.skip == 0: self.buf.append("</strong><br>")
            return
        if self.cap_lede and tag in ("p", "span"):
            self.cap_lede = False; return
        if self.skip == 0 and self.in_content and tag in ALLOWED and tag != "br":
            self.buf.append(f"</{ALLOWED[tag]}>")

    def handle_data(self, data):
        if self.cap_lede:
            self.lede += data
        elif self.skip == 0 and self.in_content:
            self.buf.append(data)

def clean(html):
    html = re.sub(r"\s+", " ", html)
    html = re.sub(r"<(p|h3|h4|li|ul|ol|blockquote)>\s*</\1>", "", html)  # drop empties
    return html.strip()

def build(slug, path):
    with open(path, encoding="utf-8") as f:
        ex = Extractor(); ex.feed(f.read())
    secs = [clean(s) for s in ex.sections if clean(s)]
    if not secs:
        return None
    # the page already shows the description, so don't repeat the cover subtitle as a lede
    n_teaser = 1 if len(secs) <= 3 else 2
    teaser = "".join(secs[:n_teaser])
    rest = "".join(secs[n_teaser:]) or secs[-1]
    return {"teaser": teaser, "rest": rest}

reg = json.load(open(REG))
out = {}
for m in reg["lead_magnets"]:
    slug = m["slug"]
    path = os.path.expanduser((m.get("html_path") or "").replace("~", os.path.expanduser("~")))
    if slug == "smart-shot-openart":
        continue  # keep the hand-written version in guideContent.ts
    if not path or not os.path.exists(path):
        continue
    try:
        c = build(slug, path)
        if c: out[slug] = c
    except Exception as e:
        print("skip", slug, e)

json.dump(out, open(os.path.abspath(OUT), "w"), indent=1)
print("wrote", len(out), "guides ->", os.path.abspath(OUT))
