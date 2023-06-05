import { NewsAgency } from "@/types/news-agency";
import { Screenshot } from "@/types/screenshot";
import { cloudinary } from "@/utils/cloudinary";
import { requestScreenshots } from "@/utils/requestScreenshots";
import { TODAY_DATE } from "@/utils/today-date";
import { getPublicId } from "@cloudinary-util/util";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<string>(TODAY_DATE);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [newsAgency, setNewsAgency] = useState<string>(NewsAgency.WYBORCZA);

  const getScreenshots = async () => {
    const screenshotData = await requestScreenshots(date, newsAgency);
    setScreenshots(screenshotData);
  };

  return (
    <>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          defaultValue={TODAY_DATE}
          type="date"
          id="date"
          name="date"
          onChange={(e) => {
            const selectedDate = e.target.valueAsDate;
            const formattedDate = selectedDate?.toISOString().split("T")[0];
            setDate(formattedDate || "");
          }}
        />
      </div>

      <div>
        <label htmlFor="agency">Choose a news agency:</label>
        <select id="agency" onChange={(e) => setNewsAgency(e.target.value)}>
          {Object.values(NewsAgency).map((agency) => (
            <option key={agency} value={agency}>
              {agency}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => getScreenshots()}>Get screenshots</button>

      <ul className="grid gap-4 grid-cols-12">
        {screenshots.map((image: Screenshot) => {
          const date = new Date(image.date);

          const hours = date.getUTCHours();
          const minutes = date.getUTCMinutes();

          const humanReadableFormat = `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }`;

          const width = 800;
          const height = 600;
          const publicId = getPublicId(image.image.url);
          const url = cloudinary
            .image(publicId)
            .format("auto")
            .quality("auto")
            .addTransformation(`w_${width},h_${height},c_fill,g_north`)
            .toURL();

          return (
            <div key={image.id}>
              <div>
                <Link href={image.image.url}>
                  <Image
                    width={width}
                    height={height}
                    src={url}
                    alt="Screenshot"
                  />
                </Link>

                <small>{humanReadableFormat}</small>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}
