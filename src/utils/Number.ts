const settingNumberLessThan10 = (number: number) => {
  return number.toString().padStart(2, "0");
};

export { settingNumberLessThan10 };
