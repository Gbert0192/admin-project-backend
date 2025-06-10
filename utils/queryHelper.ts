export function pickKey<T extends object, K extends keyof T>(
  base: T,
  keys: K[]
): Pick<T, K> {
  const entries = keys.map((key) => [key, base[key]]);
  return Object.fromEntries(entries) as Pick<T, K>;
}

export function createQueryParams(
  searchParams: Record<string, unknown>,
  currentIndex = 1
) {
  let index = currentIndex;
  const values: unknown[] = [];
  let conditions = "";

  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    if (value !== null && value !== undefined) {
      if (typeof value === "string") {
        conditions += ` AND ${key}::text ILIKE $${index}`;
        values.push(`%${value}%`);
      } else {
        conditions += ` AND ${key} = $${index}`;
        values.push(value);
      }
      index++;
    }
  });

  return { conditions, values };
}

// async get(q: GetUserQuery) {
//   try {
//     const { limit, page, ...otherQuery } = q;
//     const offset = (page - 1) * limit;

//     const { conditions, values } = createQueryParams(otherQuery);

//     const query = `
//       SELECT *, COUNT(*) OVER () AS total FROM users
//       WHERE deleted_at IS NULL AND verify_status = 'Approved' ${conditions}
//       ORDER BY created_at DESC
//       LIMIT $${values.length + 1} OFFSET $${values.length + 2};
//     `;

//     const res = await this._db.query(query, [...values, limit, offset]);
//     const rows = res.rows as User & { total: number }[];
//     const total = rows[0]?.total ?? 0;

//     return {
//       data: res.rows as User[],
//       total: Number(total),
//       limit: Number(limit),
//       page: Number(page),
//     };
//   } catch (error) {
//     logger.error("Error getting users:", error);
//     errorFormatter("INTERNAL_SERVER_ERROR", "Internal Server Error");
//   }
// }
