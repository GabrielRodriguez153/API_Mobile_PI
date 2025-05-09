import FAQ from '../models/FAQ.js';

export const getFAQs = async (req, res) => {
  const faqs = await FAQ.find();
  res.json(faqs);
};

export const askFAQ = async (req, res) => {
  const { question } = req.body;
  const faq = await FAQ.findOne({ question: new RegExp(question, 'i') });
  res.json({ answer: faq ? faq.answer : "Desculpe, não encontrei resposta." });
};

export const createFAQ = async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: "Pergunta e resposta são obrigatórias." });
  }

  try {
    const existing = await FAQ.findOne({ question: new RegExp(`^${question}$`, 'i') });

    if (existing) {
      return res.status(409).json({ message: "Essa pergunta já está cadastrada." });
    }

    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();

    res.status(201).json(newFAQ);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar FAQ." });
  }
};