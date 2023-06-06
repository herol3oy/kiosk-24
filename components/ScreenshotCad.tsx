import Image from "next/image";
import { getOptimizeThumbnail } from "@/utils/getOptimizeThumbnail";
import { Screenshot } from "@/types/screenshot";
import { Dispatch, SetStateAction } from "react";

export type ScreenshotCard = {
  screenshots: Screenshot[];
  setScreenshotUrl: Dispatch<SetStateAction<string>>;
};

const ScreenshotCard = ({ screenshots, setScreenshotUrl }: ScreenshotCard) => {
  return (
    <ul className="grid grid-cols-4 gap-2">
      {screenshots.map((image: Screenshot) => {
        const date = new Date(image.date);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const humanReadableFormat = `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`;
        const { url, width, height } = getOptimizeThumbnail(image);
        return (
          <div
            className="border shadow-md rounded my-5 hover:-translate-y-2 transition-all cursor-pointer"
            key={image.id}
            onClick={() => setScreenshotUrl(image.image.url)}
          >
            <Image
              className="my-2"
              width={width}
              height={height}
              src={url}
              alt="Screenshot"
            />
            <small className="bg-green-400 p-2 rounded cursor-pointer">
              {humanReadableFormat}
            </small>
          </div>
        );
      })}
    </ul>
  );
};

export default ScreenshotCard;
