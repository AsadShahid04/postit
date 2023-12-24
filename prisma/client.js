import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient() // we are creating a new client if it doesn't exist
if (process.env.NODE_ENV === "production") globalThis.prisma = client

export defualt client
