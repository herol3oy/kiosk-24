import { getScreenshots } from "@/utils/get-screenshots";
import { TODAY_DATE } from "@/utils/today-date";
import { Dispatch, SetStateAction } from "react";
import { Screenshot } from "@/types/screenshot";
import NEWS_AGENCY_URLS from "@/scripts/news-agency-urls";

export type ScreenshotGeneratorType = {
  setNewsAgencyDate: Dispatch<SetStateAction<string>>;
  newsAgencyDate: string;
  setScreenshots: Dispatch<SetStateAction<Screenshot[]>>;
  setNewsAgency: Dispatch<SetStateAction<string>>;
  newsAgency: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const ScreenshotGenerator = ({
  setNewsAgencyDate,
  newsAgencyDate,
  setScreenshots,
  setNewsAgency,
  newsAgency,
  setLoading,
}: ScreenshotGeneratorType) => (
  <div className="flex flex-col gap-5 w-full my-5 bg-blue-300 p-5 rounded">
    <div className="flex gap-5">
      <div className="flex flex-col gap-2">
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
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
          htmlFor="agency"
        >
          Select a news agency:
        </label>
        <select
          className="h-full px-4 rounded"
          id="agency"
          onChange={(e) => setNewsAgency(e.target.value)}
        >
          {Object.entries(NEWS_AGENCY_URLS).map(([agency, url]) => (
            <option key={agency} value={url}>
              {url}
            </option>
          ))}
        </select>
      </div>
    </div>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-max rounded"
      onClick={() =>
        getScreenshots(newsAgencyDate, newsAgency, setScreenshots, setLoading)
      }
    >
      Get screenshots
    </button>
  </div>
);

export default ScreenshotGenerator;
