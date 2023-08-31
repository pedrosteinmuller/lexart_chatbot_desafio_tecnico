# Web Chatbot Project

This project consists of a fullstack project that I participated in a selection process for a fullstack developer job at LexartLabs.

-> Technologies used in Backend

- Node.js;
- Express.js;
- Prisma;
- Typescript;
- dotenv, bcypt.js, jsonwebtoken, nodemon

-> Technologies used in Frontend

- React.js;
- Next.js;
- Axios;
- Typescript;

## Overview

Welcome to the Web Chatbot project! This chatbot is designed to engage in conversations based on trigger terms, require user authentication, display loan options, provide loan information, and export conversation history to a CSV file.

## Features

- Interpretation of trigger terms: "Hello," "Goodbye," "Good," and "I want" to initiate conversations.
- User authentication required to continue the conversation.
- Display of loan options upon encountering the term "loan."
- Information pages for applying for a loan, loan conditions, and help.
- Conversation closure and storage in the database when the user uses the term "Goodbye."
- Export of conversation history to a CSV file.

## Getting Started

### Cloning the Repository

```bash
git clone https://github.com/pedrosteinmuller/lexart_chatbot_desafio_tecnico.git
```

### Installing Dependencies

```
cd chatbot_app_lexart
npm install
```

### Setup and Usage

```
Navigate to the project directory: cd lexart_chatbot_desafio_tecnico && cd chatbot_app_lexart
Install backend dependencies: cd backend && npm install
Install frontend dependencies: cd frontend && npm install
Start the backend server: npm start (inside the backend directory)
Start the frontend application: npm run dev (inside the frontend directory)
Access the frontend application at http://localhost:3000.
```