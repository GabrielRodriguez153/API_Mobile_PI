# AntraVision API

![License](https://img.shields.io/badge/license-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Local%20Compass-brightgreen)

Uma API RESTful moderna para o sistema **AntraVision**, que monitora a saúde de plantações usando dados de sensores (umidade) e análises de antracnose em mudas de pupunheiras.

---

## 📋 Sumário

* [Funcionalidades](#-funcionalidades)
* [Tecnologias](#-tecnologias)
* [Estrutura de Pastas](#-estrutura-de-pastas)
* [Instalação](#-instalação)
* [Configuração](#-configuração)
* [Como rodar](#-como-rodar)
* [Endpoints Principais](#-endpoints-principais)
* [Fluxos de Tela](#-fluxos-de-tela)
* [Contribuição](#-contribuição)
* [Licença](#-licença)

---

## 🔥 Funcionalidades

1. **Autenticação**
   * Registro de usuário com validação de endereço.
   * Login por username ou e‑mail.
   * Login social (Twitter, Facebook, Google) – stubs para futuras integrações.

2. **Gerenciamento de Propriedades**
   * Cadastro e listagem de fazendas vinculadas ao usuário.

3. **Coleta de Dados**
   * Registro de detecções de umidade e saúde (análise de antracnose).

4. **Histórico e Estatísticas**
   * Cards e gráficos de plantas saudáveis vs doentes.
   * Comparação de índices entre propriedades.
   * Estatísticas por plantações (status: saudável, atenção, grave, crítico).

5. **Interface de FAQ**
   * Chat de perguntas e respostas pré‑definidas.

---

## ⚙️ Tecnologias

* **Node.js** (ES Modules)
* **Express** (Framework do Node.js)
* **Mongoose** (MongoDB Compass local)
* **dotenv** (Variavéis de Ambiente)
* **bcryptjs** (Gerador de Senhas Encriptografadas)
* **jsonwebtoken** (Criador de Tokens para melhor autenticidade)

---

## 🗂️ Estrutura de Pastas

```
antravision-api/
├── src/
│   ├── config/           # Configurações (MongoDB)
│   ├── controllers/      # Lógica de cada rota
│   ├── middlewares/      # Auth, validações
│   ├── models/           # Schemas Mongoose
│   ├── routes/           # Definição de endpoints
│   ├── app.js            # Instância do Express
│   └── server.js         # Conexão DB + start server
├── .env                  # Variáveis de ambiente
├── package.json
└── README.md
```

---

## 🚀 Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/antravision-api.git
   cd antravision-api
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```

---

## 🔧 Configuração

Crie um arquivo `.env` na raiz com as variáveis:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/seubanco
JWT_SECRET=seuSegredoJWT
```

> **Importante:** não versionar o `.env`.

---

## 🎬 Como rodar

```bash
npm run dev
```

* Acesse `http://localhost:3000` para ver a mensagem de saúde da API.
* Abra o MongoDB Compass e conecte em `mongodb://localhost:27017/seubanco` para monitorar coleções.

---

## 🎨 Fluxos de Tela (UI)

| Tela                          | Funcionalidades Principais                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| **Login**                     | Username/email + senha (toggle view), OAuth stubs (Twitter, Google…)                        |
| **Cadastro**                  | Username, celular, endereço (autocompletar/validar), e‑mail, senha + confirmação (toggle)   |
| **Home Dashboard**            | Cards de umidade, índices de ocorrência, comparação entre propriedades, gráficos de período |
| **Scanner**                   | Integração IA para análise de imagens                                                       |
| **Histórico Geral**           | Cards com gráficos de plantas saudáveis vs doentes                                          |
| **Histórico por Propriedade** | Gráfico detalhado, mini‑cards (infectadas, saudáveis, total), índices diários e por idade   |
| **Perfil**                    | Dados pessoais, gerenciamento de propriedades, mapa de validação de endereço                |
| **FAQ**                       | Chat com perguntas e respostas pré‑definidas                                                |
| **Estatísticas por Setor**    | Colunas coloridas (verde, amarelo, laranja, vermelho) por setor                             |

---

## 🤝 Contribuição

1. Fork este repositório
2. Crie uma branch: `git checkout -b feature/nova-rota`
3. Faça suas alterações e commit: `git commit -m "feat: descrição"`
4. Envie para a branch: `git push origin feature/nova-rota`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
