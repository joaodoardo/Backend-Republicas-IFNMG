# Backend Repúblicas IFNMG 🏡📚

## 👨‍🎓 Autores
**João Eduardo Ferreira Souza & Givanildo Barbosa Sousa Filho & Luiz Felipe Pereira Lima**

## 📚 Descrição e Objetivo
Este projeto é um backend desenvolvido em **Node.js** com **Express.js** e **Prisma ORM** para um site feito para anunciar repúblicas estudantis do **IFNMG**. O sistema permite que usuários cadastrem repúblicas, visualizem repúblicas cadastradas e atualizem ou excluam suas próprias repúblicas.

### 🚀 Funcionalidades:
- ✨ **Autenticação de Usuários** com **JWT**
- 👤 **Cadastro e Login** de usuários com senhas criptografadas
- 🛏️ **Cadastro de repúblicas** (somente usuários autenticados)
- 🔁 **Atualização de repúblicas** (somente pelo criador do anúncio)
- ✖️ **Exclusão de repúblicas** (somente pelo criador do anúncio)
- 🔍 **Listagem de repúblicas** disponíveis

## 🛠️ Tecnologias Utilizadas
- 📝 **Node.js** e **Express.js** para criação da API
- 🔄 **Prisma ORM** para interação com o banco de dados PostgreSQL
- 🔑 **JWT (JSON Web Token)** para autenticação
- ⛏️ **Bcrypt.js** para hashing de senhas
- 🌐 **CORS** para controle de acesso
- 📃 **Dotenv** para variáveis de ambiente

## ▶️ Como Executar o Projeto
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/republicas-ifnmg.git
   ```
2. Instale as dependências:
   ```bash
   cd republicas-ifnmg
   npm install
   ```
3. Configure o arquivo `.env` com a sua `DATABASE_URL` e `SECRET_KEY`.
4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```

## 💚 Estrutura do Projeto
```
/
├── prisma/
│   ├── schema.prisma
├── .env
├── index.js
├── LICENSE
├── package.json
├── README.md
```

## 📚 Fontes de Referência
- 📁 [Documentação do Prisma ORM](https://www.prisma.io/docs)
- 📁 [Express.js - Guia Oficial](https://expressjs.com/pt-br/)
- 📁 [JWT - JSON Web Token](https://jwt.io/)
- 📁 [Bcrypt.js - Hash de Senhas](https://www.npmjs.com/package/bcryptjs)

## ⚖️ Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

