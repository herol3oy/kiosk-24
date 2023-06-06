import NewsSection from "@/components/NewsSections";
import NEWS_AGENCY_URLS from "@/scripts/news-agency-urls";
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
    NEWS_AGENCY_URLS.WYBORCZA
  );
  const [secondNewsAgency, setSecondNewsAgency] = useState<string>(
    NEWS_AGENCY_URLS.WYBORCZA
  );
  const [firstScreenshotUrl, setFirstScreenshotUrl] = useState<string>("");
  const [secondScreenshotUrl, setSecondScreenshotUrl] = useState<string>("");
  const [firstLoading, setFirstLoading] = useState<boolean>(false);
  const [secondSectionLoading, setSecondSectionLoading] =
    useState<boolean>(false);

  const [firstFullImageLoading, setFirstFullImageLoading] =
    useState<boolean>(false);

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
        setLoading={setFirstLoading}
        loading={firstLoading}
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
        setLoading={setSecondSectionLoading}
        loading={secondSectionLoading}
      />
    </div>
  );
}
