#!/usr/bin/env python3
"""Rebrand a lead-magnet HTML from the old navy/gold template to the new
joshualarosa.ai quiet-editorial brand (bone/ink + yellow accent, Geist + Instrument Serif).
Usage: python3 rebrand_magnet.py <input.html> <output.html>
"""
import sys, re

OLD_FONTS = "family=Playfair+Display:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&"
NEW_FONTS = "family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&"

# old gold + dark palette -> new brand (global hex/rgb swaps catch hardcoded decorative values)
COLOR_MAP = {
    "#c9a96e": "#EBC400", "#C9A96E": "#EBC400",
    "#ddc08a": "#F0CE3A", "#DDC08A": "#F0CE3A",
    "#a88b4a": "#C9A800", "#A88B4A": "#C9A800",
    "201,169,110": "235,196,0", "201, 169, 110": "235, 196, 0",
    "#0a0e1a": "#FAF8F3", "#0A0E1A": "#FAF8F3",
    "#141824": "#FFFFFF",
    "#f0ece4": "#16130B", "#F0ECE4": "#16130B",
    "#d0ccc4": "#4A463E", "#D0CCC4": "#4A463E",
    "#6b7080": "#8C857A", "#6B7080": "#8C857A",
    "#07090f": "#16130B", "#07090F": "#16130B",
}

OVERRIDE = """
/* === joshualarosa.ai rebrand overrides === */
.cover::before { background: none !important; }
.cover-border { border-color: rgba(22,19,11,0.12) !important; }
.cover h1 .gold {
  background: none !important; -webkit-text-fill-color: #16130B !important;
  color: #16130B !important; border-bottom: 4px solid #EBC400; padding-bottom: 2px;
}
.gold {
  background: none !important; -webkit-text-fill-color: #16130B !important; color: #16130B !important;
}
body { background-color: #FAF8F3 !important; }
/* prompt/code block = intentional dark "terminal" card, light text */
.prompt-block, .prompt-block * { color: #F4F1EA !important; -webkit-text-fill-color: #F4F1EA !important; }
.prompt-block .prompt-label-text, .prompt-block .prompt-label, .prompt-block .gold {
  color: #EBC400 !important; -webkit-text-fill-color: #EBC400 !important;
}
"""

def transform(html: str) -> str:
    html = html.replace(OLD_FONTS, NEW_FONTS)
    html = html.replace("Playfair Display", "Instrument Serif")
    html = html.replace("Outfit", "Geist")
    for old, new in COLOR_MAP.items():
        html = html.replace(old, new)
    html = html.replace("Building Leverage", "joshualarosa.ai")
    # inject overrides at the end of the first <style> block
    html = html.replace("</style>", OVERRIDE + "\n    </style>", 1)
    return html

def main():
    src, dst = sys.argv[1], sys.argv[2]
    with open(src, encoding="utf-8") as f:
        html = f.read()
    out = transform(html)
    with open(dst, "w", encoding="utf-8") as f:
        f.write(out)
    print("rebranded ->", dst)

if __name__ == "__main__":
    main()
