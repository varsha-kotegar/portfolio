# Varsha Kotegar — Portfolio

An editorial-style, premium developer portfolio built with modern web technologies. Designed for performance, accessibility, and a seamless user narrative.

## Overview

This project is a high-performance, responsive portfolio that showcases projects, skills, and achievements with a focus on clean typography and smooth, purposeful animations. It features a fully integrated backend for contact management.

## Tech Stack

- **Frontend**: [React 18](https://reactjs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (Animations)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: Serverless API (Node.js)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Email Service**: [Resend](https://resend.com/)

## Key Features

- **Editorial Design**: Large typography, generous whitespace, and a high-contrast theme.
- **Smooth Narratives**: Section-based transitions and reveal animations using Framer Motion.
- **Interactive Elements**: Magnetic hover effects and custom cursor interactions.
- **Integrated Contact Form**: A functional backend that validates inputs using **Zod**, stores messages in **MongoDB**, and triggers real-time email notifications via **Resend**.
- **Responsive & Optimized**: Built with mobile-first principles and optimized for SEO.

## 📥 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/varsha-kotegar/varsha-s-editorial-studio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd varsha-s-editorial-studio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
```

### Running Locally

```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to view the application.

## 📂 Project Structure

- `/api`: Serverless API routes (Server-side logic)
- `/src/components`: Reusable UI elements and layout sections
- `/src/hooks`: Custom React hooks for interactions
- `/src/lib`: Shared utilities and database connectivity
- `/src/pages`: Main view components
- `/public`: Static assets

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/) or similar platforms that support serverless functions. Simply push your code to your repository and connect it to a Vercel project with the environment variables configured.

---

Built with ❤️ by [Varsha Kotegar](https://www.linkedin.com/in/varshakotegar)
