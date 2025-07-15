# Quickstart Guide

A brief guide to running this project locally on development.

## Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/products/docker-desktop/)

## Getting Started

1. **Setup Environment & Install**

   ```bash
   # Copy the environment file
   cp .env.example .env

   # Install dependencies
   bun install
   ```

2. **Run Database & Apply Schema**

   ```bash
   # Start the database container in the background
   docker-compose -f docker-compose.dev.yml up -d

   # Apply the database schema
   bun run db:push
   ```

   Make sure your migrations has applied to the database. You can verify the database using this command:

   ```
   # Run this command
   bun run db:studio
   # then open the link provided (ctrl + click), 
   # usually the link shown is https://local.drizzle.studio
   ```

3. **Run the Application**

   ```bash
   bun run dev
   ```

4. **Access the Application**
   Open [http://localhost:5000](http://localhost:5000). Documentation is available at [http://localhost:5000/docs](http://localhost:5000/docs).