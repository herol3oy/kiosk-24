import Image from "next/image";
import { NewsAgency } from "@/types/news-agency";
import { Screenshot } from "@/types/screenshot";
import { TODAY_DATE } from "@/utils/today-date";
import { getOptimizeThumbnail } from "@/utils/getOptimizeThumbnail";
import { getScreenshots } from "@/utils/get-screenshots";
import { NewsSectionType } from "@/types/news-section-type";

const NewsSection = ({
  setNewsAgencyDate,
  newsAgencyDate,
  setScreenshots,
  screenshots,
  setNewsAgency,
  newsAgency,
  setScreenshotUrl,
  screenshotUrl,
}: NewsSectionType) => {
  return (
    <article className="w-full">
      <div className="flex gap-5 w-min my-5 bg-blue-300 p-5 rounded">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
          htmlFor="date"
        >
          Select a date:
        </label>
        <input
          className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          defaultValue={TODAY_DATE}
          type="date"
          id="date"
          name="date"
          onChange={(e) => {
            const selectedDate = e.target.valueAsDate;
            const formattedDate = selectedDate?.toISOString().split("T")[0];
            setNewsAgencyDate(formattedDate || "");
          }}
        />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
          htmlFor="agency"
        >
          Select a news agency:
        </label>
        <select id="agency" onChange={(e) => setNewsAgency(e.target.value)}>
          {Object.values(NewsAgency).map((agency) => (
            <option key={agency} value={agency}>
              {agency}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          getScreenshots(newsAgencyDate, newsAgency, setScreenshots)
        }
      >
        Get screenshots
      </button>

      <ul className="grid grid-cols-4">
        {screenshots.map((image: Screenshot) => {
          const date = new Date(image.date);
          const hours = date.getUTCHours();
          const minutes = date.getUTCMinutes();
          const humanReadableFormat = `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }`;
          const { url, width, height } = getOptimizeThumbnail(image);
          return (
            <div className="my-5" key={image.id}>
              <Image
                className="my-2"
                width={width}
                height={height}
                src={url}
                alt="Screenshot"
              />
              <small
                className="bg-green-400 p-2 rounded cursor-pointer"
                onClick={() => setScreenshotUrl(image.image.url)}
              >
                {humanReadableFormat}
              </small>
            </div>
          );
        })}
      </ul>
      <section>
        {screenshotUrl.length ? (
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
    </article>
  );
};

export default NewsSection;
