import NewsSection from "@/components/NewsSections";
import { NewsAgency } from "@/types/news-agency";
import { Screenshot } from "@/types/screenshot";
import { TODAY_DATE } from "@/utils/today-date";
import { useState } from "react";

export default function Home() {
  const [firstNewsAgencyDate, setFirstNewsAgencyDate] =
    useState<string>(TODAY_DATE);
  const [secondNewsAgencyDate, setSecondNewsAgencyDate] =
    useState<string>(TODAY_DATE);

  const [firstScreenshots, setFirstScreenshots] = useState<Screenshot[]>([]);
  const [secondScreenshots, setSecondScreenshots] = useState<Screenshot[]>([]);

  const [firstNewsAgency, setFirsNewsAgency] = useState<string>(
    NewsAgency.WYBORCZA
  );
  const [secondNewsAgency, setSecondNewsAgency] = useState<string>(
    NewsAgency.WYBORCZA
  );

  const [firstScreenshotUrl, setFirstScreenshotUrl] = useState<string>("");
  const [secondScreenshotUrl, setSecondScreenshotUrl] = useState<string>("");

  return (
    <div className="flex gap-2">
      <NewsSection
        setNewsAgencyDate={setFirstNewsAgencyDate}
        newsAgencyDate={firstNewsAgencyDate}
        setScreenshots={setFirstScreenshots}
        screenshots={firstScreenshots}
        setNewsAgency={setFirsNewsAgency}
        newsAgency={firstNewsAgency}
        setScreenshotUrl={setFirstScreenshotUrl}
        screenshotUrl={firstScreenshotUrl}
      />

      <NewsSection
        setNewsAgencyDate={setSecondNewsAgencyDate}
        newsAgencyDate={secondNewsAgencyDate}
        setScreenshots={setSecondScreenshots}
        screenshots={secondScreenshots}
        setNewsAgency={setSecondNewsAgency}
        newsAgency={secondNewsAgency}
        setScreenshotUrl={setSecondScreenshotUrl}
        screenshotUrl={secondScreenshotUrl}
      />
    </div>
  );
}
