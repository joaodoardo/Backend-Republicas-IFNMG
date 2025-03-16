require("dotenv").config();
const express = require("express");
const cors = require("cors");  
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());

//CORS
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Middleware de Autenticação
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acesso negado" });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

//Registro
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "30m" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Adicionar uma República (somente logado)
app.post("/republicas", authenticate, async (req, res) => {
  const { titulo, descricao, bairro, rua, numero, complemento, valorMensal, vagas } = req.body;
  try {
    const republica = await prisma.republica.create({
      data: { titulo, descricao, bairro, rua, numero, complemento, valorMensal, vagas, userId: req.userId }
    });
    res.status(201).json({ message: "República adicionada com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Deletar uma república (somente o criador pode excluir)
app.delete("/republicas/:id", authenticate, async (req, res) => {
  const republicaId = parseInt(req.params.id);

  try {
    const republica = await prisma.republica.findUnique({
      where: { id: republicaId },
    });

    if (!republica) {
      return res.status(404).json({ error: "República não encontrada" });
    }

    if (republica.userId !== req.userId) {
      return res.status(403).json({ error: "Você não tem permissão para excluir esta república" });
    }

    await prisma.republica.delete({ where: { id: republicaId } });
    res.json({ message: "República excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir república" });
  }
});

//Listar todas as repúblicas 
app.get("/republicas", async (req, res) => {
  try {
    const republicas = await prisma.republica.findMany();
    res.json(republicas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar repúblicas" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
