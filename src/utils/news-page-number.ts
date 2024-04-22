import { URLSearchParamFields } from "./http-handlers";

/**
 * Page number starts at 1.
 * Non-valid page numbers also are resolved to 1.
 */
export function getPageNumberFromSearchParams<
  TParams extends Record<URLSearchParamFields, any>,
>(searchParams: TParams): number {
  console.log("searchparams pagenumber", searchParams);
  const p = searchParams[URLSearchParamFields.PAGE];
  const pageNumber: number = +(p || 1);

  return Number.isNaN(pageNumber) ? 1 : pageNumber;
}
