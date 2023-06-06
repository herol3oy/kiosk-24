import { NewsSectionType } from "@/types/news-section-type";
import DisplayFullScreenshot from "./DisplayFullScreenshot";
import ScreenshotCard from "./ScreenshotCad";
import ScreenshotGenerator from "./ScreenshotGenerator";

const NewsSection = ({
  setNewsAgencyDate,
  newsAgencyDate,
  setScreenshots,
  screenshots,
  setNewsAgency,
  newsAgency,
  setScreenshotUrl,
  screenshotUrl,
  setLoading,
  loading,
}: NewsSectionType) => {
  return (
    <div className="w-full">
      <ScreenshotGenerator
        setNewsAgencyDate={setNewsAgencyDate}
        newsAgencyDate={newsAgencyDate}
        setScreenshots={setScreenshots}
        setNewsAgency={setNewsAgency}
        newsAgency={newsAgency}
        setLoading={setLoading}
      />

      {loading ? (
        "Loading..."
      ) : screenshots.length ? (
        <ScreenshotCard
          screenshots={screenshots}
          setScreenshotUrl={setScreenshotUrl}
        />
      ) : (
        <h1>
          Select a date (today and before) and a website to see the screenshots.
        </h1>
      )}

      <DisplayFullScreenshot screenshotUrl={screenshotUrl} />
    </div>
  );
};

export default NewsSection;
