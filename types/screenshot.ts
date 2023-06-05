import { Image } from "./image";

export interface Screenshot {
  id: string;
  url: string;
  date: Date;
  image: Image;
}
