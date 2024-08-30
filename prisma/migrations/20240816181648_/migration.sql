/*
  Warnings:

  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CityEnum" AS ENUM ('SAO_PAULO', 'RIO_DE_JANEIRO', 'BELO_HORIZONTE', 'BRASILIA', 'CURITIBA', 'PORTO_ALEGRE', 'RECIFE', 'SALVADOR', 'FORTALEZA', 'MANAUS', 'CAMPINAS');

-- CreateEnum
CREATE TYPE "MaritalStatusEnum" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" "CityEnum" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "maritalStatus" "MaritalStatusEnum" NOT NULL;
