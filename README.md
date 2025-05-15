# Quizzy — AI-Enhanced Quiz Platform

A modern full-stack quiz application built with **Next.js**, **Spring Boot**, and **Tailwind CSS**, featuring AI-generated questions, dynamic result exports, and a beautiful user experience.

## ✨ Features

- Take quizzes with a real-time timer  
- Submit answers and view personalized results  
- Export quizzes in **PDF** and **JSON** format  
- Secure user authentication  
- AI-powered question generation (Azure OpenAI)  
- Responsive design with dark mode  

---

## 🚀 Getting Started

Follow these steps to run the frontend locally:

### 1. Install Dependencies

Make sure you're in the root directory of the Next.js project and run:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a .env.local or .env file in the root of your project with the following:

```md
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Replace 8080 with the port your Spring Boot backend is running on.

### 3. Run the Development Server

```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the app.

## 🧪 Technologies Used

#### Frontend:
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn/UI

#### Backend: 
- Spring Boot 
- PostgreSQL

#### AI Integration: 
- Azure OpenAI Service
#### PDF Export: 
- iText PDF
#### Auth: 
- JWT-based authentication
