-- CreateEnum
CREATE TYPE "PriceRatingEnum" AS ENUM ('VERY_CHEAP', 'CHEAP', 'FAIR', 'EXPENSIVE', 'VERY_EXPENSIVE');

-- CreateEnum
CREATE TYPE "RegulationTypeEnum" AS ENUM ('PDF', 'TEXT');

-- CreateEnum
CREATE TYPE "BillingType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateEnum
CREATE TYPE "OfferTypeEnum" AS ENUM ('ORGANIC', 'INORGANIC');

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "institutionalWebsite" TEXT,
    "logo" TEXT,
    "banner" TEXT,
    "b2bImage" TEXT,
    "photos" TEXT[],
    "priceRating" "PriceRatingEnum" NOT NULL,
    "giftbackCustomers" INTEGER[],
    "discountPercentage" INTEGER NOT NULL,
    "considerBonuses" BOOLEAN NOT NULL DEFAULT false,
    "agesActivated" BOOLEAN NOT NULL DEFAULT false,
    "bonusesQuantityLimit" INTEGER NOT NULL DEFAULT 0,
    "daysBetweenBonuses" INTEGER NOT NULL DEFAULT 0,
    "maxAge" INTEGER DEFAULT 130,
    "minAge" INTEGER DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "smsText" TEXT,
    "pushText" TEXT,
    "smsTextEcommerce" TEXT,
    "pushTextEcommerce" TEXT,
    "highlightGiftbackCustomer" INTEGER,
    "order" INTEGER,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "regulation" TEXT,
    "regulationType" "RegulationTypeEnum",
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "billingType" "BillingType",
    "offerValue" DOUBLE PRECISION,
    "type" "OfferTypeEnum" NOT NULL DEFAULT 'ORGANIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Offer_title_idx" ON "Offer"("title");

-- CreateIndex
CREATE INDEX "Offer_priceRating_idx" ON "Offer"("priceRating");

-- CreateIndex
CREATE INDEX "Offer_status_idx" ON "Offer"("status");

-- CreateIndex
CREATE INDEX "Offer_order_idx" ON "Offer"("order");

-- CreateIndex
CREATE INDEX "Offer_discountPercentage_idx" ON "Offer"("discountPercentage");

-- CreateIndex
CREATE INDEX "Offer_visible_idx" ON "Offer"("visible");

-- CreateIndex
CREATE INDEX "Offer_status_visible_idx" ON "Offer"("status", "visible");

-- CreateIndex
CREATE INDEX "Offer_status_visible_order_idx" ON "Offer"("status", "visible", "order");

-- CreateIndex
CREATE INDEX "Offer_website_idx" ON "Offer"("website");

-- CreateIndex
CREATE INDEX "Offer_giftbackCustomers_idx" ON "Offer"("giftbackCustomers");

-- CreateIndex
CREATE INDEX "Offer_photos_idx" ON "Offer"("photos");

-- CreateIndex
CREATE INDEX "Offer_maxAge_idx" ON "Offer"("maxAge");

-- CreateIndex
CREATE INDEX "Offer_discountPercentage_giftbackCustomers_idx" ON "Offer"("discountPercentage", "giftbackCustomers");

-- CreateIndex
CREATE INDEX "Offer_discountPercentage_giftbackCustomers_status_idx" ON "Offer"("discountPercentage", "giftbackCustomers", "status");

-- CreateIndex
CREATE INDEX "Offer_discountPercentage_giftbackCustomers_status_visible_idx" ON "Offer"("discountPercentage", "giftbackCustomers", "status", "visible");
