import OpenAI from "npm:openai";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY")
});

Deno.serve(async (request) => {
  try {
    const { hasBox, photos, draft } = await request.json();

    if (!Array.isArray(photos) || !photos.length) {
      return Response.json({ error: "At least one photo is required." }, { status: 400 });
    }

    const instruction = hasBox
      ? "Read the shoe box label and return JSON with brand, description, size, and notes."
      : "Infer the shoe brand, model description, size if visible, and notes from the shoe photos. Return JSON only.";

    const response = await openai.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "You extract sneaker inventory data. Return strict JSON with keys brand, description, size, notes. Do not include markdown. If size is not visible, use an empty string."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `${instruction}\nCurrent draft: ${JSON.stringify(draft || {})}`
            },
            ...photos.map((photo) => ({
              type: "input_image",
              image_url: photo.dataUrl
            }))
          ]
        }
      ]
    });

    const text = (response.output_text || "{}").trim();
    const parsed = JSON.parse(text);
    return Response.json(parsed);
  } catch (error) {
    return Response.json({ error: error.message || String(error) }, { status: 500 });
  }
});
