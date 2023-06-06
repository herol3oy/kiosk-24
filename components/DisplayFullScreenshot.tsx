import { Screenshot } from "@/types/screenshot";
import Image from "next/image";

export type DisplayFullScreenshotType = {
  screenshotUrl: string;
};
const DisplayFullScreenshot = ({
  screenshotUrl,
}: DisplayFullScreenshotType) => {
  return (
    <section>
      {screenshotUrl ? (
        <Image
          className="w-full"
          width={600}
          height={1200}
          src={screenshotUrl}
          alt="Screenshot"
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default DisplayFullScreenshot;
