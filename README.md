# Nexium_Afshan_Assign1

# Quote Generator Web App
- A web app using ShadCN UI form and local quotes.
- Deployed to Vercel
A motivational quote generator built as part of Assignment 1 during my internship journey.

## Features
- Generate random quotes based on user-selected topics or all quotes.
- Copy quotes to clipboard with feedback notifications.
- Interactive UI with topic badges, hover effects, and a gradient background.
- Loading states and error handling for a smooth user experience.

## Technologies and Libraries
- **Next.js**: Framework for server-side rendering and static site generation (used across the app).
- **TypeScript**: Type safety for robust code (used in `page.tsx` and `QuoteGenerator.tsx`).
- **Tailwind CSS**: Utility-first CSS framework for responsive and creative design (used in all `.tsx` files).
- **react-hook-form**: Form handling with validation (used in `QuoteGenerator.tsx`).
- **zod**: Schema validation for form inputs (used in `QuoteGenerator.tsx`).
- **react-hot-toast**: Toast notifications for user feedback (used in `QuoteGenerator.tsx`).
- **Playfair Display**: Custom font for elegant typography (linked via `<Head>` in `QuoteGenerator.tsx`).

## Project Structure
- **`src/app/page.tsx`**: Main entry point rendering the navbar, `QuoteGenerator`, and `Footer` with a static gradient background.
- **`src/components/QuoteGenerator.tsx`**: Core component handling quote generation, form submission, and UI interactions with state management and validation.
- **`src/components/footer.tsx`**: Footer component (assumed simple).
- **`src/data/quotes.json`**: JSON file containing quote data organized by topics.
- **`src/styles/globals.css`**: Global CSS file for styles (e.g., gradient background).
- **`package.json`**: Configuration file listing dependencies and scripts for the project.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/AfshanN754/Nexium_Afshan_Assign1
