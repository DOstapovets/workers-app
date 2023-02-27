import bcrypt from 'bcrypt';

export const generateHash = async (str: string) => {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(str, salt);
};
export const compareHash = (str: string, hash: string) =>
  bcrypt.compare(str, hash);
