# Authentication Task

Deployment Link: [https://auth-task-abhishek.netlify.app/](https://auth-task-abhishek.netlify.app/)

```bash
# Sample Credentails:
Email: tester@gmail.com
Password: Tester@123
```

## Description

This is a simple authentication task that is built using Next.js, Prisma.js, and MongoDB. The task is to build a simple authentication system that allows users to register and login. The user should be able to see and edit their profile after logging in. The user should also be able to logout.

# Installation and Runnning

```bash

# 1. Install npm dependencies

> npm install

# 2. Generate Prisma Client from Schema

> npx prisma generate

# 3. Start the Next.js Development server

> npm run dev

# 4. Open & check http://localhost:3000

# 5. Build the Next.js application for production

> npm run build

# 6. Start the Next.js server in production mode

> npm start

```

# Tech Stack and Libraries

## What is Next.js, why did I use it over seperate React.js and Express.js projects?

Next.js is opensource framework that allows you to build server-side rendered React.js applications. It is built on top of Express.js and React.js. It is a great framework for building full-stack applications. It is also very easy to use and has a lot of great features. I used it for this project because it is a great framework for building full-stack applications and it is very easy to use.

- Since Next.js can host both React.js Frontend and Express.js Backend, I did not have to use seperate projects for the frontend and backend.
- This made it easier to deploy the application to Netlify.
- Reference: [Next.js](https://nextjs.org/)

## What is Prisma.js, why did I use it to connect with MongoDB over Mongoose?

Prisma.js is an open-source ORM that allows you to connect to different databases. It is built on top of Node.js and Typescript. It is a popular ORM widely used over Sequalize, Mongoose.

- With Prisma.js we need not worry about managing the database connections.
- Also we simply declare schema, Prism.js will automatically create manage the tables/collections for us.
- Prisma.js can automatically generate the CRUD operations for both SQL and NoSQL databases.
- Reference: [Prisma.js](https://www.prisma.io/)
- Reference: [Mongoose vs Prisma.js](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-mongoose)

## What is MongoDB, why did I use it over SQL databases?

Reason #1: For Free Cloud Hosting of MongoDB Atlas

- MongoDB Atlas is a cloud-hosted MongoDB service. It is free for small projects.
- Reference: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Reason #2: NoSQL Databases are quickly developing the applicaiton

- NoSQL databases are schema-less. This means that we can add new fields to the database without having to change the schema.
- This makes it easier to develop the application.

## Why Tailwind CSS and Chakra UI over Traditional CSS?

- Tailwind CSS is a utility-first CSS framework. We just need to write class names and styles are automatically applied
- Chakra UI is a React component library that is built on top of Tailwind CSS.
- With Chakra UI, we get React components like Toasts, Icons, etc.. that we can use to build great UI/UX

- Reference: [TailwindCSS](https://tailwindcss.com/docs/)
- Reference: [Chakra UI](https://chakra-ui.com/docs/components)

## What is Netlify, why did I use it to deploy the application?

Netlify is a cloud platform that allows you to deploy your web applications. It is free for small projects.

- Netlify has automatic driver for deploting React.js, Express.js, Next.js projects.

- Reference: [Netlify](https://www.netlify.com/)

## Authentication Approach via JWT

- JSON Web Tokens (JWT) are an open, industry standard RFC 7519 method for representing claims securely between two parties.

- JWT can `sign()` or `verify()` tokens. The `sign()` method takes a payload and a secret or a private key to create a JSON Web Token. The `verify()` method takes a token and a secret or a public key to verify that the token is valid.

- Reference: [JWT](https://jwt.io/)
