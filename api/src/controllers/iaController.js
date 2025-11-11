import Data from "../models/Data.js";

export const analisarPlanta = async (req, res) => {
  try {
    const { userId, farmId, location, image } = req.body;

    if (!userId || !farmId || !location || !image) {
      return res
        .status(400)
        .json({ error: "userId, farmId, location e image são obrigatórios" });
    }

    const iaUrl = `${process.env.IA_URL}/predict`;
    const response = await fetch(iaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        location: location,
        image: image,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API da IA: ${response.status}`);
    }

    const resultadoIA = await response.json();

    const prediction = resultadoIA.resultado;
    const confidence = parseFloat(
      resultadoIA.confianca.replace("%", "").trim()
    );

    const newData = new Data({
      userId,
      farmId,
      location,
      image,
      prediction,
      confidence,
    });
    await newData.save();

    res.status(201).json({
      message: "Análise concluída e dados salvos no banco",
      data: newData,
      iaResult: { prediction, confidence },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar análise" });
  }
};

export const getAnalisesHistoricas = async (req, res) => {
  try {
    const { farmId } = req.params;
    const analises = await Data.find({ farmId })
      .sort({ timestamp: -1 })
      .limit(50);
    res.status(200).json(analises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
};
