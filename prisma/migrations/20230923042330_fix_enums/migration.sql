/*
  Warnings:

  - The values [COMPLETED] on the enum `SprintStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "SprintStatus" ADD VALUE 'FUTURE';
ALTER TYPE "SprintStatus"DROP VALUE 'COMPLETED';
