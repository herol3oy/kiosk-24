import { Dispatch, SetStateAction } from "react";
import { Screenshot } from "./screenshot";

export type NewsSectionType = {
  setNewsAgencyDate: Dispatch<SetStateAction<string>>;
  newsAgencyDate: string;
  setScreenshots: Dispatch<SetStateAction<Screenshot[]>>;
  screenshots: Screenshot[];
  setNewsAgency: Dispatch<SetStateAction<string>>;
  newsAgency: string;
  setScreenshotUrl: Dispatch<SetStateAction<string>>;
  screenshotUrl: string;
};
