import axios from "axios";

const IA_API_URL = "http://3.135.213.245:5000";
const WEB_API_URL = "http://3.148.252.145:4000";
const WEB_API_TOKEN = "12#34$56";

export const analyzeImage = async (req, res) => {
  try {
    console.log("📱 Recebendo requisição de análise do mobile...");

    const { image, user_id, location } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "Nenhuma imagem fornecida",
      });
    }

    console.log("🔄 Enviando para API IA...");

    // 1. Enviar para API IA
    const iaResponse = await axios.post(
      `${IA_API_URL}/predict`,
      {
        image: image,
      },
      {
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Resposta da IA:", iaResponse.data);

    // 2. Processar resposta da IA
    let resultado, confianca;

    if (iaResponse.data.resultado) {
      resultado = iaResponse.data.resultado;
      confianca = iaResponse.data.confianca;
    } else if (iaResponse.data.content) {
      const textContent = iaResponse.data.content;
      try {
        const data = JSON.parse(textContent);
        resultado = data.resultado || textContent;
        confianca = data.confianca || "N/A";
      } catch {
        resultado = textContent;
        confianca = "N/A";
      }
    } else {
      resultado = "Análise concluída";
      confianca = "N/A";
    }

    console.log("🔄 Enviando para API Web...");

    // 3. Enviar para API Web
    const webhookData = {
      user_id: user_id || "user-mobile",
      location: location || "Localização Mobile",
      resultado: resultado,
      confianca: confianca,
      image_data: image,
      timestamp: new Date().toISOString(),
    };

    try {
      const webResponse = await axios.post(
        `${WEB_API_URL}/mobile/webhook`,
        webhookData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${WEB_API_TOKEN}`,
          },
          timeout: 10000,
        }
      );

      console.log("✅ Dados enviados para Web:", webResponse.data);

      // 4. Retornar resposta para o mobile
      res.json({
        success: true,
        status: "success",
        resultado: resultado,
        confianca: confianca,
        case_id: webResponse.data.case_id,
        message: "Análise concluída e caso criado no sistema web",
      });
    } catch (webError) {
      console.warn(
        "⚠️ Aviso: Dados não enviados para o web, mas análise foi realizada"
      );

      // Retornar sucesso mesmo se o webhook falhar
      res.json({
        success: true,
        status: "success",
        resultado: resultado,
        confianca: confianca,
        message: "Análise concluída (dados não enviados para o sistema web)",
      });
    }
  } catch (error) {
    console.error("❌ Erro na análise:", error.message);

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        success: false,
        error: "Serviço de análise temporariamente indisponível",
      });
    }

    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
    });
  }
};

export const mobileHealthCheck = async (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "mobile-analysis",
    endpoints: {
      analyze: "POST /mobile/analyze",
      health: "GET /mobile/health",
    },
  });
};
