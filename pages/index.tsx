import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { getPublicId } from "@cloudinary-util/util";

const inter = Inter({ subsets: ["latin"] });

export interface Screenshot {
  url: string;
  date: Date;
  image: Image;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export default function Home() {
  const [data, setData] = useState<Screenshot[]>([]);

  useEffect(() => {
    const requestFiles = async () => {
      const files = await fetch("/api/getScreenshots");
      const { data } = await files.json();
      setData(data);
    };

    requestFiles();
  }, []);

  return (
    <>
      <ul className="grid gap-4 grid-cols-12 ">
        {data.map((archive) => {
          const width = 800;
          const height = 600;
          const publicId = getPublicId(archive.image.url);
          const url = cld
            .image(publicId)
            .format("auto")
            .quality("auto")
            .addTransformation(`w_${width},h_${height},c_fill,g_north`)
            .toURL();
          return (
            <li key={archive.image.url}>
              <a href={archive.image.url}>
                <Image width={width} height={height} src={url} alt="Screenshot" />
              </a>
              <p>{new Date(archive.date).toLocaleString()}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}


