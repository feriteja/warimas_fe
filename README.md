# Warimas Frontend

Welcome to the **Warimas Frontend** repository! This is the user-facing interface for the Warimas platform, engineered to provide a fast, responsive, and intuitive shopping experience. Built with the latest web technologies, it focuses on performance and scalability.

## ✨ Key Features

- **🛍️ Dynamic Product Feed**: Real-time product listings with optimized loading states using React Suspense.
- **🎯 Personalized Recommendations**: Smart suggestion engine to enhance user engagement.
- **⚡ High Performance**: Leveraging Next.js App Router and Server Components for lightning-fast page loads.
- **🎨 Modern Design System**: A clean, accessible UI built with Tailwind CSS and Lucide React icons.
- **🔍 Smart Navigation**: Intuitive category browsing and search capabilities.
- **🐻 Efficient State Management**: Powered by Zustand for a smooth and responsive client-side experience.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** GraphQL & [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Font:** [Geist](https://vercel.com/font)

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- Package manager: npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd warimas_fe
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and update the values with your credentials.
   ```bash
   cp example.env .env.local
   ```
   _Make sure to fill in `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_GRAPHQL_URL`, etc._

### Running the Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
