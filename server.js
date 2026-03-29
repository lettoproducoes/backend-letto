import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// 🔑 COLOQUE SEU ACCESS TOKEN AQUI
mercadopago.configure({
  access_token: "APP_USR-1690392523532198-032823-40cc367524096f7774205b3ba0e9f230-17474669"
});

app.post("/criar-pagamento", async (req, res) => {
  try {
    const { total, descricao } = req.body;

    const preference = {
      items: [
        {
          title: descricao,
          quantity: 1,
          currency_id: "BRL",
          unit_price: Number(total)
        }
      ],
      // ID do vídeo para rastrear vendas
      external_reference: video_id
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      link: response.body.init_point
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar pagamento" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
