import { Screenshot } from "@/types/screenshot";
import { requestScreenshots } from "@/utils/requestScreenshots";
import { Dispatch, SetStateAction } from "react";

export const getScreenshots = async (
  date: string,
  newsAgency: string,
  setter: Dispatch<SetStateAction<Screenshot[]>>
) => {
  const screenshotData = await requestScreenshots(date, newsAgency);
  setter(screenshotData);
};
