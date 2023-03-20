export async function getCroppedImg(imageSrc, croppedAreaPixels, zoom) {
  console.log('zoom et croppedAreaPixels'+zoom +croppedAreaPixels);
const image = await loadImage(imageSrc);
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");



const maxSize = Math.max(image.width, image.height);
const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

canvas.width = safeArea;
canvas.height = safeArea;

ctx.translate(safeArea / 2, safeArea / 2);
ctx.translate(-safeArea / 2, -safeArea / 2);

ctx.drawImage(
  image,
  safeArea / 2 - image.width * zoom / 2,
  safeArea / 2 - image.height * zoom / 2,
  image.width * zoom,
  image.height * zoom
);

const data = ctx.getImageData(0, 0, safeArea, safeArea);

canvas.width = croppedAreaPixels.width;
canvas.height = croppedAreaPixels.height;

ctx.putImageData(
  data,
  Math.round(-croppedAreaPixels.x + safeArea / 2 - image.width * zoom / 2),
  Math.round(-croppedAreaPixels.y + safeArea / 2 - image.height * zoom / 2)
);
  
  console.log("Image recadrée sur le canevas :", canvas);

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      console.log("Image chargée :", img);
      resolve(img);
    };
    img.onerror = (error) => reject(error);
    img.src = src;
  });
}

