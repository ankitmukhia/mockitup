import { getPlaiceholder } from "plaiceholder";

export const getLocalBase64 = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const buffer = await response.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (error) {
    throw error instanceof Error ? error.message : "Something went wrong";
  }
};
