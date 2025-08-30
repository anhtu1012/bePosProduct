-- CreateTable
CREATE TABLE "public"."category" (
    "category_id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."product" (
    "product_id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category_id" BIGINT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_percent" INTEGER NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,
    "is_best_seller" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
