import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const ARCHIVES_DIRECTORY = path.join(process.cwd(), "/public/");

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
      const jsonFiles: string[] = [];

      files.forEach((file) => {
        const filePath = path.join(ARCHIVES_DIRECTORY, file);
        const fileExtension = path.extname(file);

        if (fileExtension === ".json") {
          jsonFiles.push(filePath);
        }
      });

      const fileContents: object[] = [];

      jsonFiles.forEach((filePath) => {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            try {
              const parsedData = JSON.parse(data);
              fileContents.push(parsedData);

              if (fileContents.length === jsonFiles.length) {
                res.status(200).json({ data: fileContents });
              }
            } catch (error) {
              console.log(`Error parsing JSON in file ${filePath}: ${error}`);
            }
          }
        });
      });
    }
  });
}
