import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const ARCHIVES_DIRECTORY = "./archives/";

type Data = {
  data: object[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fs.readdir(ARCHIVES_DIRECTORY, (err, files: string[]) => {
    if (err) {
      console.log(err);
    } else {
      const fileContents: object[] = [];

      files.forEach((file) => {
        const filePath = ARCHIVES_DIRECTORY + file;
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            try {
              const parsedData = JSON.parse(data);
              fileContents.push(parsedData);

              if (fileContents.length === files.length) {
                res.status(200).json({ data: fileContents });
              }
            } catch (error) {
              console.log(`Error parsing JSON in file ${file}: ${error}`);
            }
          }
        });
      });
    }
  });
}
