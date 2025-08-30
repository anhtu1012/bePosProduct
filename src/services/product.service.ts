import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { formatPagingData } from '../utils/listWithPaging.utils';

export async function getProductService({
  limit = 10,
  offset = 0,
  name,
}: {
  limit?: number;
  offset?: number;
  name?: string;
}) {
  const where = name ? { name: { contains: name, mode: Prisma.QueryMode.insensitive } } : undefined;
  const [products, count] = await Promise.all([
    prisma.product.findMany({
      skip: offset,
      take: limit,
      where,
      orderBy: { id: 'asc' },
      include: {
        category: { select: { name: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);
  return formatPagingData({
    items: products,
    count,
    limit,
    offset,
    mapItem: (p) => ({
      ...p,
      categoryName: p.category?.name || null,
      category: undefined,
    }),
  });
}

export async function getProductByIdService(id: string | number) {
  return prisma.product.findUnique({
    where: { id: typeof id === 'string' ? BigInt(id) : id },
  });
}

export async function getProductByNameService(name: string) {
  return prisma.product.findFirst({ where: { name } });
}

export async function createProductService(data: any) {
  return prisma.product.create({ data });
}

export async function createManyProductService(data: any[]) {
  return prisma.product.createMany({ data, skipDuplicates: true });
}

export async function updateProductService(id: string | number, data: any) {
  return prisma.product.update({
    where: { id: typeof id === 'string' ? BigInt(id) : id },
    data,
  });
}

export async function deleteProductService(id: string | number) {
  return prisma.product.delete({
    where: { id: typeof id === 'string' ? BigInt(id) : id },
  });
}
