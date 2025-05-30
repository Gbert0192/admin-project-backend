export function ValidateSchema(schema, req) {
  return schema.parse(req);
}
