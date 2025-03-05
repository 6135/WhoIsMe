# WhoIsMe

```bash
echo "# WhoIsMe" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/6135/WhoIsMe.git
git push -u origin main
```

## Prerequisites

* Node.js
* npm or yarn

## Setup Instructions

1. Create a new React project with TypeScript:

```bash
npx create-react-app my-app --template typescript
cd my-app
```

2. Install additional dependencies:

```bash
npm install @radix-ui/react-icons tailwindcss
npm install -D @types/react
```

3. Setup Tailwind CSS:

```bash
npx tailwindcss init -p
```

## Project Structure

```
src/
├── components/
│   ├── GameCard.tsx
│   ├── HomePage.tsx
│   └── ContactSection.tsx
├── assets/
│   └── images/
│       ├── image1.jpg
│       ├── image2.jpg
│       └── ...
├── App.tsx
└── index.tsx
```
