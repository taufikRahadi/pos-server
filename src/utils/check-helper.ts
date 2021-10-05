import { PaginationArgs } from "./pagination";

export function checkPagination(paginationArgs: PaginationArgs) {
  const paginate = {
    take: 10,
    skip: 0
  };

  paginate.take = paginationArgs.limit >= 0 ? paginationArgs.limit : 10;
  paginate.skip = !paginationArgs.skip || paginationArgs.skip <= 1 ? 0 : paginationArgs.skip * paginate.take - paginate.take;

  return paginate;
}

export function checkPage(count: number, paginate: PaginationArgs) {
  const limit_take = checkPagination(paginate);
  const page = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 1
  }

  page.totalItems = count
  page.totalPages = count == 0 || limit_take.take == 0 ? 1 : Math.ceil(page.totalItems / limit_take.take)
  page.currentPage = limit_take.skip >= 1 ? paginate.skip : 1

  return page
}

export function checkSortArg(sort: string, orderBy?: string) {
  const obj = {};
  sort = sort != null ? sort: 'ASC';
  orderBy = orderBy != null ? orderBy : 'id';
  obj[orderBy] = sort
  return {
    order: {
      ...obj
    }
  }
}
