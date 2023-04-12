// Import Prisma Client
import { PrismaClient } from "@prisma/client";

// Instantiate Prisma Client
const prisma = new PrismaClient();

// Function to delete all rows from the User table
async function deleteAllRows(): Promise<void> {
  try {
    // Delete all rows from the User table
    const result = await prisma.stand.deleteMany();

    // Log the number of deleted rows
    console.log(`Deleted ${result.count} rows from the User table.`);
  } catch (error) {
    console.error("Error deleting rows:", error);
  } finally {
    // Disconnect the Prisma Client
    await prisma.$disconnect();
  }
}

// Call the function to delete all rows
deleteAllRows();
