export const toString = (object: any): string => {
  return JSON.stringify(object);
};

export const toJSON = (string: string): any => {
  return JSON.parse(string);
};
