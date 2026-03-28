# 🔔 SilentPing — Anonymous Messaging Platform

> **Live Demo:** [https://silentping-app.vercel.app](https://silentping-app.vercel.app)

**SilentPing** is a full-stack anonymous feedback platform where users can create a unique profile link and receive completely anonymous messages from anyone. Built with **Next.js 16**, **MongoDB Atlas**, and **NextAuth.js**.

---

## 🖥️ Screenshots

| Landing Page | Dashboard |
|:---:|:---:|
| Clean hero page with feature highlights | View, manage & delete anonymous messages |

| Sign In | Sign Up |
|:---:|:---:|
| Secure login with glassmorphism UI | Quick registration with form validation |

---

## ✨ Features

- **🔗 Unique Profile Link** — Each user gets a shareable link (`/u/username`) for receiving anonymous messages
- **🕵️ 100% Anonymous** — Senders' identities are never stored or revealed
- **🔐 Secure Authentication** — Email/password login with NextAuth.js + JWT sessions
- **📬 Message Dashboard** — View all received messages with timestamps, delete unwanted ones
- **🔄 Accept/Reject Toggle** — Turn message acceptance on or off anytime
- **📋 One-Click Copy** — Copy your unique link to clipboard instantly
- **📱 Fully Responsive** — Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | NextAuth.js (Credentials + JWT) |
| **Styling** | Tailwind CSS 4 |
| **Form Validation** | React Hook Form + Zod |
| **Email Service** | Resend + React Email |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/          # Login page with glassmorphism UI
│   │   └── sign-up/          # Registration page
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth config & route
│   │   ├── sign-up/          # User registration API
│   │   ├── accept-messages/  # Toggle message acceptance
│   │   ├── get-messages/     # Fetch user messages
│   │   ├── send-message/     # Public endpoint to send anonymous msg
│   │   └── delete-message/   # Delete a specific message
│   ├── dashboard/            # Authenticated user dashboard
│   ├── u/[username]/         # Public anonymous message form
│   └── page.tsx              # Landing page
├── context/                  # NextAuth SessionProvider
├── helpers/                  # Email sending utility
├── lib/                      # DB connection & Resend client
├── model/                    # Mongoose User & Message schemas
├── schemas/                  # Zod validation schemas
├── types/                    # TypeScript type definitions
└── proxy.ts                  # Auth middleware (route protection)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sandip4083/silentping-app.git
cd silentping-app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI="your-mongodb-atlas-connection-string"
RESEND_API_KEY="your-resend-api-key"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 How It Works

1. **Sign Up** — Create an account with username, email & password
2. **Get Your Link** — Dashboard shows your unique link: `silentping-app.vercel.app/u/your-username`
3. **Share It** — Send the link to anyone (friends, audience, colleagues)
4. **Receive Messages** — Anonymous messages appear on your dashboard in real-time
5. **Manage** — Delete messages or toggle acceptance on/off

---

## 🌐 Deployment

This app is deployed on **Vercel** with automatic deployments from the `main` branch.

> ⚠️ **Note:** This is a full-stack app with server-side API routes. It **cannot** be hosted on GitHub Pages — use Vercel, Railway, or similar platforms.

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Zod Documentation](https://zod.dev/)
- [Resend Email Docs](https://resend.com/docs/send-with-nextjs)

---

## 👤 Author

**Sandip Sah** — [@Sandip4083](https://github.com/Sandip4083)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
