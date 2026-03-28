# SilentPing

**SilentPing** is a fast and secure anonymous feedback platform built with Next.js. It allows users to register, receive a unique link, and accept anonymous messages smoothly and securely. It also supports shutting down the message acceptance temporarily.

## ✨ Features

- **Anonymous Messaging**: Users can send messages to a registered user without revealing their identity.
- **Authentication**: Secure user signup, login, and robust session management using NextAuth.js.
- **Email Verification**: User accounts are secured with a mandatory email verification process powered by Resend API.
- **Message Management**: Users can turn message acceptance on or off at their convenience.
- **Dashboard**: A clean and responsive dashboard to view, manage, and delete the received messages.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, React Email Components
- **Form Management:** React Hook Form & Zod
- **Database:** MongoDB & Mongoose
- **Authentication:** NextAuth.js
- **Email Service:** Resend

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd silentping
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following keys. Make sure to replace values with your own keys:

   ```env
   MONGODB_URI="mongodb://localhost:27017/silentping" 
   RESEND_API_KEY="your-resend-api-key"
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Core Structure Insight

- `src/app/`: Next.js frontend pages and core routing.
- `src/app/api/`: API endpoints logic (signup, messaging, authentication logic).
- `src/model/`: Mongoose schemas outlining `User` and nested `Message` models.
- `src/schemas/`: Zod validation instances for clean server and client validation.
- `src/helpers/`: Contains utility code including email verification functions layout.
- `emails/`: Custom email designs processed explicitly via React Email.

## 🛡️ Useful Resources

To delve deeper into the dependencies scaling this project, rely on:
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guidelines](https://next-auth.js.org/getting-started/introduction)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Zod Handbook](https://zod.dev/)
- [Resend Email Implementation](https://resend.com/docs/send-with-nextjs)

## 📌 Deployment

The easiest structure to deploy Next.js apps is using the [Vercel Platform](https://vercel.com/new). Don't forget to push your environment variables directly to the service settings to allow API configurations mapping. Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for comprehensive steps.
