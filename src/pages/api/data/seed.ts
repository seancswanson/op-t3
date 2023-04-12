import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import { decode, encode } from "blurhash";

import { prisma } from "../../../utils/prisma";

const loadImageData = async (src: string): Promise<ImageData> => {
  const image = await loadImage(src);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("2d context not available");
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, image.width, image.height);
  return {
    data: imageData.data,
    width: imageData.width,
    height: imageData.height,
  };
};

const encodeImageToBlurhash = async (imageUrl: string): Promise<string> => {
  const imageData = await loadImageData(imageUrl);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

const load = async () => {
  try {
    const jsonBlob = fs.readFileSync("./all_data_91-117.json", "utf-8");
    const jsonObj = JSON.parse(jsonBlob);
    const formattedStandData = await Promise.all(
      jsonObj.data.map(async (stand: any, key: number) => {
        const blurhash = await encodeImageToBlurhash(stand.stand_images[0]);
        const pixels = decode(blurhash, 32, 32); // Uint8ClampedArray
        const canvas = createCanvas(32, 32);
        const context = canvas.getContext("2d");
        if (!context) throw new Error("2d context not available");
        const imageData = context.createImageData(32, 32);
        imageData.data.set(pixels);
        context.putImageData(imageData, 0, 0);
        const blurDataUrl = canvas.toDataURL();
        console.log(stand.id, stand.name, blurDataUrl);
        return {
          id: stand.id,
          name: stand.stand,
          name_jp: stand.stand_ja,
          reference_url: stand.reference_url,
          season: stand.season,
          type_0: stand.type[0],
          type_1: stand.type[1],
          type_2: stand.type[2],
          type_3: stand.type[3],
          stand_image_0: stand.stand_images[0],
          stand_image_1: stand.stand_images[1],
          stand_image_2: stand.stand_images[2],
          stand_image_3: stand.stand_images[3],
          stand_image_blur_0: blurDataUrl,
          user: stand.user,
          gender: stand.gender,
          hair_color: stand.hair_color,
          eye_color: stand.eye_color,
          user_image_0: stand.user_images[0],
          user_image_1: stand.user_images[1],
          user_image_2: stand.user_images[2],
          user_image_3: stand.user_images[3],
        };
      })
    );
    console.log(formattedStandData);
    const fillDbWithStands = await prisma.stand.createMany({
      data: formattedStandData,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    console.log("finally");
  }
};

load();
