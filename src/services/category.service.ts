import { formatPagingData } from '../utils/listWithPaging.utils';
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '../prisma';

// Tìm category theo code
export async function getCategoryByCode(code: string) {
  return prisma.category.findFirst({ where: { code } });
}
export async function getCategoryService({ limit = 10, offset = 0 } = {}) {
  const [items, count] = await Promise.all([
    prisma.category.findMany({
      skip: offset,
      take: limit,
      orderBy: { id: 'asc' },
    }),
    prisma.category.count(),
  ]);
  return formatPagingData({
    items,
    count,
    limit,
    offset,
    mapItem: (c) => ({ ...c, id: c.id.toString() }),
  });
}

export async function getCategoryByIdService(id: string | number) {
  return prisma.category.findUnique({
    where: { id: typeof id === 'string' ? BigInt(id) : id },
  });
}

export async function createCategoryService(data: any) {
  return prisma.category.create({ data });
}

export async function createManyCategoryService(data: any[]) {
  return prisma.category.createMany({ data, skipDuplicates: true });
}

export async function updateCategoryService(id: string | number, data: any) {
  return prisma.category.update({
    where: { id: typeof id === 'string' ? BigInt(id) : id },
    data,
  });
}

export async function deleteCategoryService(id: string | number) {
  return prisma.category.delete({
    where: { id: typeof id === 'string' ? BigInt(id) : id },
  });
}
