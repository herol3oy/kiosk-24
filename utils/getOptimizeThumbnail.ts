import { Screenshot } from "@/types/screenshot";
import { cloudinary } from "@/utils/cloudinary";
import { getPublicId } from "@cloudinary-util/util";

export const getOptimizeThumbnail = (image: Screenshot) => {
  const width = 200;
  const height = 200;
  const publicId = getPublicId(image.image.url);
  const url = cloudinary
    .image(publicId)
    .format("auto")
    .quality("auto")
    .addTransformation(`w_${width},h_${height},c_fill,g_north`)
    .toURL();
  return { url, width, height };
};
