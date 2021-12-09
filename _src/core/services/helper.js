export const filterGraphql = schema => {
  return schema.replace(/\s+/g, ' ').trim();
};
