"use client";
import { useState } from "react";

const STYLES = {
  coach: "🧘 Coach Motivacional",
  ceo: "💼 CEO Visionário",
  guru: "🔮 Guru Espiritual",
  ted: "🎤 Palestrante TED",
};

const EXAMPLES = [
  "Meu gato morreu",
  "Fui demitido essa semana",
  "Queimei o jantar que ia fazer pra minha sogra",
  "Errei uma fórmula no Excel",
  "Perdi o voo por 3 minutos",
  "Choveu no dia do meu casamento",
];

export default function Home() {
  const [situation, setSituation] = useState("");
  const [style, setStyle] = useState("coach");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!situation.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation, style }),
      });
      const data = await res.json();
      setOutput(data.text || "Erro ao gerar. Tente novamente.");
    } catch {
      setOutput("Erro de conexão. Tente novamente.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh", color: "#F9F6EE", fontFamily: "Inter, sans-serif", padding: "0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .bebas { font-family: 'Bebas Neue', sans-serif; }
        textarea { resize: none; outline: none; }
        textarea:focus { border-color: #F5C400 !important; }
        .pill:hover { border-color: #F5C400 !important; color: #F9F6EE !important; }
        .btn-primary:hover:not(:disabled) { background: #C9A000 !important; }
        .btn-copy:hover { background: #F5C400 !important; color: #0A0A0A !important; }
        .btn-again:hover { border-color: #555 !important; color: #F9F6EE !important; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .dot { width:8px;height:8px;border-radius:50%;background:#F5C400;display:inline-block;animation:bounce 0.9s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "18px 32px", borderBottom: "1px solid #1e1e1e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="bebas" style={{ fontSize: "1.5rem", letterSpacing: "0.08em", color: "#F5C400" }}>
          Coach<span style={{ color: "#F9F6EE" }}>This</span>
        </div>
        <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "#F5C400", color: "#0A0A0A", padding: "5px 12px", borderRadius: "2px" }}>
          Gerador de Lero-Lero™
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "60px 24px 40px" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F5C400", marginBottom: "16px" }}>Powered by propósito e sinergia</p>
        <h1 className="bebas" style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.92, marginBottom: "20px" }}>
          Qualquer coisa<br />vira <span style={{ color: "#F5C400" }}>lição</span><br />de vida
        </h1>
        <p style={{ fontSize: "1rem", color: "#6B6B6B", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
          Seu gato morreu? Perdeu o emprego? Queimou o arroz? Não importa — aqui qualquer situação vira um pitch de superação e mindset vencedor.
        </p>
      </div>

      {/* Ticker */}
      <div style={{ overflow: "hidden", borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e", padding: "10px 0", marginBottom: "48px" }}>
        <div style={{ display: "flex", gap: "48px", animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
          {[...EXAMPLES, ...EXAMPLES].map((ex, i) => (
            <span key={i} style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#444", flexShrink: 0 }}>{ex} →</span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ maxWidth: "660px", margin: "0 auto", padding: "0 24px 48px" }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F5C400", marginBottom: "10px" }}>
          O que aconteceu com você?
        </label>
        <div style={{ position: "relative" }}>
          <textarea
            value={situation}
            onChange={e => setSituation(e.target.value.slice(0, 300))}
            onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) generate(); }}
            placeholder="Ex: meu gato morreu, perdi as chaves, queimei o jantar..."
            rows={3}
            style={{ width: "100%", background: "#111", border: "1px solid #2e2e2e", borderRadius: "4px", color: "#F9F6EE", fontFamily: "Inter, sans-serif", fontSize: "1rem", padding: "18px 20px", transition: "border-color 0.2s" }}
          />
          <span style={{ position: "absolute", bottom: "10px", right: "14px", fontSize: "0.68rem", color: "#333" }}>{situation.length}/300</span>
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "14px" }}>
          <button className="btn-primary" onClick={generate} disabled={loading || !situation.trim()}
            style={{ flex: 1, background: "#F5C400", color: "#0A0A0A", fontFamily: "Bebas Neue, sans-serif", fontSize: "1.2rem", letterSpacing: "0.08em", border: "none", borderRadius: "3px", padding: "14px 24px", cursor: loading || !situation.trim() ? "not-allowed" : "pointer", opacity: loading || !situation.trim() ? 0.5 : 1, transition: "background 0.15s" }}>
            ⚡ Transformar em Lição de Vida
          </button>
          <select value={style} onChange={e => setStyle(e.target.value)}
            style={{ background: "#111", border: "1px solid #2e2e2e", color: "#F9F6EE", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", padding: "0 12px", borderRadius: "3px", height: "52px", cursor: "pointer", outline: "none" }}>
            {Object.entries(STYLES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Output */}
      {(loading || output) && (
        <div style={{ maxWidth: "660px", margin: "0 auto 64px", padding: "0 24px" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F5C400", marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
            Sua lição de vida <div style={{ flex: 1, height: "1px", background: "#2e2e2e" }} />
          </div>
          <div style={{ background: "#0F0F0F", border: "1px solid #2a2a2a", borderLeft: "3px solid #F5C400", borderRadius: "4px", padding: "28px" }}>
            {loading ? (
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <div className="dot" style={{ animationDelay: "0s" }} />
                <div className="dot" style={{ animationDelay: "0.15s" }} />
                <div className="dot" style={{ animationDelay: "0.3s" }} />
              </div>
            ) : (
              <p style={{ fontSize: "1.02rem", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{output}</p>
            )}
            {!loading && output && (
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button className="btn-copy" onClick={copy} style={{ background: "transparent", color: "#F5C400", border: "1px solid #F5C400", borderRadius: "3px", padding: "8px 18px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, transition: "all 0.15s" }}>
                  {copied ? "Copiado! ✓" : "Copiar"}
                </button>
                <button className="btn-again" onClick={generate} style={{ background: "transparent", color: "#6B6B6B", border: "1px solid #2e2e2e", borderRadius: "3px", padding: "8px 18px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, transition: "all 0.15s" }}>
                  Gerar outro
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Examples */}
      <div style={{ borderTop: "1px solid #1a1a1a", padding: "56px 24px", textAlign: "center" }}>
        <h2 className="bebas" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "0.04em", marginBottom: "6px" }}>
          Experimente <span style={{ color: "#F5C400" }}>esses</span>
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "36px" }}>Clique numa situação para ver a mágica acontecer</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", maxWidth: "820px", margin: "0 auto" }}>
          {EXAMPLES.map((ex, i) => (
            <button key={i} className="pill" onClick={() => { setSituation(ex); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ background: "#111", border: "1px solid #222", borderRadius: "4px", padding: "13px 18px", fontSize: "0.88rem", color: "#6B6B6B", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <span style={{ color: "#F5C400", marginRight: "8px" }}>→</span>{ex}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #1a1a1a", padding: "24px 32px", display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#333", flexWrap: "wrap", gap: "8px" }}>
        <span>© 2026 <strong style={{ color: "#F5C400" }}>CoachThis™</strong> — Todos os lero-leros reservados</span>
        <span>Nenhum guru foi prejudicado na produção deste site</span>
      </div>
    </main>
  );
}
