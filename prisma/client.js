import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient(); // Create client if it doesn't exist

if (process.env.NODE_ENV === "production") {
  globalThis.prisma = client;
}

export default client; // Export the client as the default value
