## 🚀 Mortgage Calculator App

This project was build using React (Vite), ShadcnUI, Node.js, Express, Cypress and Vitest

Below I explained a little of patterns:

### Frontend

Composition Pattern

Used destructuring of components into smaller parts in order to ensure their flexibility and scalability

### Backend

Clean Architecture

Clean architecture was used to develop a scalable API, its responsibilities defined and abstraction dependency

## 🔥 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (>= 22.x)
- npm (>= 11.x)

## 🧙‍♂️ Instructions

- [Instructions Here](./instructions/README.md)

## 💾 Installation (Frontend)

1. Clone the repository:

```sh
# Clone this repository
$ git clone https://github.com/wallacefreitas/mortgage-calculator.git

# Access web project folder
cd mortgage-calculator/web
```

2. Install the dependencies:

```sh
npm install
```

3. Running the Application

```sh
npm run dev
```

## 💾 Installation (Backend)

1. Clone the repository:

```sh
# Clone this repository
$ git clone https://github.com/wallacefreitas/mortgage-calculator.git

# Access web project folder
cd mortgage-calculator/server
```

2. Install the dependencies:

```sh
npm install
```

3. Running the Application

```sh
npm run dev
```

## ⏱️ Running Tests

1. Run the unit tests:

```sh
npm run test:unit
```

## 📂 Project Structure

```sh
mortgage-calculator/
├─── web/
├───── src/
│       ├── common/
│       │   ├── components/
│       │   └── utils/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── shared/
│       │   ├── utils/
│       ├── App.tsx
│       ├── global.css
│       ├── index.css
│       └── main.tsx
├───── index.html
├───── package.json
├───── tsconfig.json
│───── vite.config.ts
│─── server/
├───── src/
│       ├── application/
│       ├── core/
│       ├── infra/
│       ├── utils/
│       ├── index.ts
│       └── routes.ts
```

## ⚙️ Services

| Description (App) | Host                  | Port |
| :---------------- | :-------------------- | :--: |
| application       | http://localhost:5173 | 5173 |
| server            | http://localhost:3001 | 3001 |

## 📷 Screenshots

add screenshots...

## 🔮 Future Implementations

✓ Improve coverage of tests <br>

## 📝 License

This project is under license MIT.

Made with ♥️ by Wallace de Freitas 👋🏻
