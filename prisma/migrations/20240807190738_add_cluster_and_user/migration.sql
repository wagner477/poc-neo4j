-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cluster" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Cluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClusterOffer" (
    "id" TEXT NOT NULL,
    "clusterId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ClusterOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCluster" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clusterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserCluster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cluster_id_idx" ON "Cluster"("id");

-- CreateIndex
CREATE INDEX "ClusterOffer_clusterId_idx" ON "ClusterOffer"("clusterId");

-- CreateIndex
CREATE INDEX "ClusterOffer_offerId_idx" ON "ClusterOffer"("offerId");

-- CreateIndex
CREATE INDEX "UserCluster_userId_idx" ON "UserCluster"("userId");

-- CreateIndex
CREATE INDEX "UserCluster_clusterId_idx" ON "UserCluster"("clusterId");

-- AddForeignKey
ALTER TABLE "ClusterOffer" ADD CONSTRAINT "ClusterOffer_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClusterOffer" ADD CONSTRAINT "ClusterOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCluster" ADD CONSTRAINT "UserCluster_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCluster" ADD CONSTRAINT "UserCluster_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
