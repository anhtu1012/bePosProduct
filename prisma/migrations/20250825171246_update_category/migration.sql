/*
  Warnings:

  - Added the required column `code` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."category" ADD COLUMN     "code" VARCHAR(50) NOT NULL;
