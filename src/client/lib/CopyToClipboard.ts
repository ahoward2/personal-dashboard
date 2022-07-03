export const copyToClipboard = async (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("clipboard successfully written to");
    })
    .catch((err) => {
      console.error(err);
    });
};
