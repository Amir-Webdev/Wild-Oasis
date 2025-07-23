import { formatDistance, parseISO, differenceInDays } from "date-fns";

/**
 * Calculate difference in days between two dates.
 * Accepts either Date objects or ISO date strings.
 */
export const subtractDates = (
  date1: string | Date,
  date2: string | Date
): number => {
  const d1 = typeof date1 === "string" ? parseISO(date1) : date1;
  const d2 = typeof date2 === "string" ? parseISO(date2) : date2;
  return differenceInDays(d1, d2);
};

/**
 * Format distance from now (e.g. '3 days ago').
 */
export const formatDistanceFromNow = (date: string | Date): string => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(parsedDate, new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
};

/**
 * Get today's date as ISO string, optionally at end of day (23:59:59.999).
 * Useful for Supabase comparisons.
 */
export const getToday = (options?: { end?: boolean }): string => {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

/**
 * Format a number as USD currency.
 */
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
