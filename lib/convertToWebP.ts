export function convertImageToWebP(file: File, quality = 0.65): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Conversion failed");

          const webpFile = new File(
            [blob],
            file.name.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
            { type: "image/webp" }
          );

          resolve(webpFile);
        },
        "image/webp",
        quality
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
