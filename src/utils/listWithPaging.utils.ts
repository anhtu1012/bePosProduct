export function formatPagingData({
  items,
  count,
  limit,
  offset,
  mapItem,
}: {
  items: any[];
  count: number;
  limit: number;
  offset: number;
  mapItem?: (item: any) => any;
}) {
  function convertBigIntFields(obj: any) {
    if (!obj || typeof obj !== 'object') return obj;
    const result: any = { ...obj };
    if (typeof result.id === 'bigint') result.id = result.id.toString();
    if (typeof result.categoryId === 'bigint') result.categoryId = result.categoryId.toString();
    return result;
  }
  const data = (mapItem ? items.map(mapItem) : items).map(convertBigIntFields);
  return {
    count,
    page: Math.floor(offset / limit) + 1,
    limit,
    data,
  };
}

import prisma from '../prisma';

interface GetListOptions {
  model: keyof typeof prisma;
  limit?: number;
  offset?: number;
  where?: any;
  orderBy?: any;
  select?: any;
}

export async function getListWithPaging({
  model,
  limit = 10,
  offset = 0,
  where,
  orderBy = { id: 'asc' },
  select,
}: GetListOptions) {
  // @ts-ignore
  const [data, total] = await Promise.all([
    // @ts-ignore
    prisma[model].findMany({ skip: offset, take: limit, where, orderBy, select }),
    // @ts-ignore
    prisma[model].count({ where }),
  ]);
  return {
    count: total,
    page: Math.floor(offset / limit) + 1,
    limit,
    data: data.map((item: any) => ({
      ...item,
      id: item.id?.toString?.() ?? item.id,
      ...(item.categoryId && { categoryId: item.categoryId.toString?.() ?? item.categoryId }),
    })),
  };
}
