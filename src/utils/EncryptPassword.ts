import bcrypt from "bcrypt";

export default async function encryptString(text: string) {
  const SALTS = 8;
  return await bcrypt.hash(text, SALTS);
}
