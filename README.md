# 📚 Bookwise
Bookwise is a modern web application built for book enthusiasts, offering users the ability to manage and explore books, reviews, and more. Developed with Next.js and Prisma, Bookwise is fully optimized for a smooth user experience with authentication, responsive design, and seamless data management.

<img src="./cover.png">

## 🚀 Project Overview
Bookwise combines the power of Next.js and Prisma with TypeScript to create an efficient and scalable book management platform. Users can explore books, manage personal collections, and interact with content, making it a comprehensive solution for book lovers.

## ✨ Key Features
- User Authentication: Integrated with NextAuth for secure and flexible user authentication.
- Book Management: Manage books, add reviews, and explore details about each book.
- Responsive Design: Fully responsive UI, built with Tailwind CSS and optimized for all devices.
- Database Integration: Prisma ORM for database management, with automated seeding and migrations.
- Efficient Form Handling: Managed with React Hook Form and validated with Zod for error-free data entry.

## 🛠️ Technologies Used

Core
- Next.js: React framework for SSR and SSG.
- React: Component-based UI development.
- TypeScript: Typed JavaScript for safer, more robust code.

Database
- Prisma: ORM for database management and query building.
- NextAuth: Secure, easy-to-use authentication library, integrated with Prisma.

UI and Styling
- Tailwind CSS: Utility-first CSS framework for efficient styling.
- Radix UI Dropdown Menu: Accessible and customizable dropdown components.
- Phosphor Icons: Icon library for a visually appealing UI.

Utilities
- React Hook Form: Form management and validation.
- Zod: Schema-based form validation.
- date-fns: Date utility library for handling dates.


## 📦 Installation
Follow these steps to set up Bookwise locally:

Requirements
Make sure you have the following installed:

Node.js (v18 or later)

pnpm (or npm/yarn)

Prisma

Setup
Clone the repository:

```bash
git clone https://github.com/username/bookwise.git
cd bookwise
```
Install dependencies:

```bash
pnpm install
```

Set up environment variables: Copy .env.example to .env and configure your database and NextAuth variables.

Run Prisma migrations:

```bash
pnpm prisma migrate dev
```

Seed the database (optional):

```bash
pnpm prisma db seed
```

Generate Prisma client:

```bash
pnpm postinstall
```

## 🚀 Running the Project

Development Server
To start the development server:

```bash
pnpm dev
```

The application will be available at http://localhost:3000.


## 🎨 Customization
Bookwise offers customization options, with Tailwind CSS for styling and theme adjustments. For component customization, refer to the component documentation or tweak Tailwind configurations to match your brand guidelines.