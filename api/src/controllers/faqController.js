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