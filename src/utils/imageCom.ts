export const compressImageToBase = (
  file: File,
  maxWidth = 800,
  quality = 0.6
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = maxWidth / img.width;

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas error");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedBase64 = canvas
        .toDataURL("image/jpeg", quality)
        .split(",")[1]; // remove prefix

      resolve(compressedBase64);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
