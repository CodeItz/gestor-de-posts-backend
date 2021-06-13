import bcrypt from "bcrypt";

export async function encryptString(text: string) {
  const SALTS = 8;
  return await bcrypt.hash(text, SALTS);
}

export async function compare(text: string, text2: string) {
  return await bcrypt.compare(text, text2);
}
