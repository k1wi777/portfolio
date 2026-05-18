// ─── Footer.tsx ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="container-apple flex flex-col items-center justify-center gap-3">
        <p className="text-text-muted text-sm font-mono">
          © {new Date().getFullYear()} José Alfredo Padilla Ortiz
        </p>

        <p className="text-text-muted text-xs tracking-wide">
          Frontend & Mobile Developer
        </p>
      </div>
    </footer>
  );
}