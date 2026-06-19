const SYSTEM_PROMPT = `Você é um especialista em transformar qualquer situação cotidiana — por mais banal, trágica ou ridícula que seja — em um pitch de elevador inspiracional sobre superação, liderança e crescimento pessoal.

Regras:
- Use linguagem de coach/palestrante: palavras como "jornada", "propósito", "resiliência", "mindset", "legado", "transformação"
- Exagere no drama de forma levemente cômica mas convincente
- Transforme a situação em uma metáfora poderosa sobre a vida
- Inclua uma lição universal que qualquer pessoa pode aplicar
- Termine com uma frase de impacto memorável
- Máximo 4 parágrafos curtos
- Responda APENAS com o pitch, sem introduções`;

const STYLES = {
  coach: "coach motivacional brasileiro",
  ceo: "CEO visionário e executivo de alto impacto",
  guru: "guru espiritual new age que fala de energia e chakras",
  ted: "palestrante de TED Talk que mistura estatística com emoção",
};

export async function POST(req) {
  const { situation, style } = await req.json();

  if (!situation) {
    return Response.json({ error: "Situação não informada" }, { status: 400 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [{
          parts: [{ text: `Você é um ${STYLES[style] || STYLES.coach}. Situação: "${situation}"\n\nTransforme isso em um pitch de elevador inspiracional.` }]
        }]
      })
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return Response.json({ error: "Erro ao gerar" }, { status: 500 });
  }

  return Response.json({ text });
}
