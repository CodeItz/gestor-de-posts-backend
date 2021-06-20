import bcrypt from "bcrypt";
import crypto from "crypto";

export async function encryptString(text: string) {
  const SALTS = 8;
  return await bcrypt.hash(text, SALTS);
}

export async function compare(text: string, text2: string) {
  return await bcrypt.compare(text, text2);
}

const CONFIG_CRYPTO = {
  algorithm: "aes-256-ctr",
  password: "d6F3Efeq",
};

export function encrypt(text: string) {
  var cipher = crypto.createCipher(
    CONFIG_CRYPTO.algorithm,
    CONFIG_CRYPTO.password
  );
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

export function decrypt(text: string) {
  var decipher = crypto.createDecipher(
    CONFIG_CRYPTO.algorithm,
    CONFIG_CRYPTO.password
  );
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}
