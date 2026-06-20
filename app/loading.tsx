export default function Loading() {
  return (
    <div className="wrap section" style={{ paddingTop: "var(--s-8)" }} aria-busy="true" aria-label="Loading">
      <div className="skel" style={{ width: 120, height: 14, marginBottom: 24 }} />
      <div className="skel" style={{ width: "min(560px, 90%)", height: 48, marginBottom: 12 }} />
      <div className="skel" style={{ width: "min(420px, 80%)", height: 48, marginBottom: 40 }} />
      <div className="grid-cards">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skel" style={{ height: 180, borderRadius: "var(--r-lg)" }} />
        ))}
      </div>
    </div>
  );
}
