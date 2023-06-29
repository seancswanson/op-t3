/*
This script reads a JSON file, processes the data it contains 
(including encoding images to blurhashes and decoding them back into pixel data), 
and then inserts the processed data into a database using Prisma. 

The script is designed to be run from the command line, and it logs its progress as it goes.
*/

// Import necessary modules
import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import { decode, encode } from "blurhash";
import { prisma } from "./utils/prisma";

interface FormattedStand {
  id: number;
  name: string;
  name_jp: string;
  reference_url: string;
  season: string;
  type_0: string | undefined;
  type_1: string | undefined;
  type_2: string | undefined;
  type_3: string | undefined;
  stand_image_0: string | undefined;
  stand_image_1: string | undefined;
  stand_image_2: string | undefined;
  stand_image_3: string | undefined;
  stand_image_blur_0: string;
  user: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  user_image_0: string | undefined;
  user_image_1: string | undefined;
  user_image_2: string | undefined;
  user_image_3: string | undefined;
}

interface RawStand {
  id: number;
  stand: string;
  stand_ja: string;
  reference_url: string;
  season: string;
  type: string[];
  stand_images: string[];
  blurDataUrl: string;
  user: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  user_images: string[];
}

// Function to load image data from a given source
const loadImageData = async (src: string): Promise<ImageData> => {
  const image = await loadImage(src); // Load the image
  const canvas = createCanvas(image.width, image.height); // Create a canvas with the same dimensions as the image
  const context = canvas.getContext("2d"); // Get the 2D rendering context for the canvas
  if (!context) throw new Error("2d context not available"); // Throw an error if the 2D context is not available
  context.drawImage(image, 0, 0); // Draw the image onto the canvas
  const imageData = context.getImageData(0, 0, image.width, image.height); // Get the image data from the canvas
  return {
    data: imageData.data, // Return the image data
    width: imageData.width, // Return the image width
    height: imageData.height, // Return the image height
    colorSpace: "display-p3",
  };
};

// Function to encode an image to a blurhash
const encodeImageToBlurhash = async (imageUrl: string): Promise<string> => {
  const imageData = await loadImageData(imageUrl); // Load the image data
  return encode(imageData.data, imageData.width, imageData.height, 4, 4); // Return the encoded image (blurhash)
};

// Main function to load and process the data
const load = async () => {
  try {
    // Read the JSON file and parse it into a JavaScript object
    const jsonBlob = fs.readFileSync("./all_data_91-117.json", "utf-8");
    const jsonObj = JSON.parse(jsonBlob);

    // Map over the data array in the JSON object, processing each item
    const formattedStandData = await Promise.all(
      jsonObj.data.map(async (stand: RawStand, key: number) => {
        // Encode the first image of each stand to a blurhash
        const blurhash = await encodeImageToBlurhash(
          stand.stand_images[0] || ""
        );

        // Decode the blurhash back into pixel data
        const pixels = decode(blurhash, 32, 32); // Uint8ClampedArray

        // Create a new canvas and get its 2D context
        const canvas = createCanvas(32, 32);
        const context = canvas.getContext("2d");
        if (!context) throw new Error("2d context not available");

        // Create a new image data object and set its data to the decoded pixels
        const imageData = context.createImageData(32, 32);
        imageData.data.set(pixels);

        // Draw the image data onto the canvas
        context.putImageData(imageData, 0, 0);

        // Convert the canvas to a data URL (base64-encoded PNG)
        const blurDataUrl = canvas.toDataURL();

        // Log the stand ID, name, and blur data URL
        console.log(stand.id, stand.stand, blurDataUrl);

        // Return a new object with the processed data
        const formattedStand: FormattedStand = {
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

        return formattedStand;
      })
    );

    // Log the formatted data
    console.log(formattedStandData);

    // Use Prisma to insert the formatted data into the database
    const fillDbWithStands = await prisma.stand.createMany({
      data: formattedStandData,
    });
  } catch (e) {
    // If an error occurs, log it and exit the process with a failure status code
    console.error(e);
    process.exit(1);
  } finally {
    // Log a message when the process is finished, regardless of whether it succeeded or failed
    console.log("finally");
  }
};

// Call the main function
load();
