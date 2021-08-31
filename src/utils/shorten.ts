const shorten = (text: string, number: number) => {
  return text.length > number ? text.slice(0, number) + "..." : text;
};

export default shorten;
