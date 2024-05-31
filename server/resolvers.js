import { randomBytes } from "crypto";
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  unlink,
} from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import path from "path";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getFiles: async function () {
      if (existsSync("files")) {
        const files = readdirSync("files");
        return files.map((n) => `http://localhost:5000/files/${n}`);
      } else return [];
    },
  },
  Mutation: {
    singleUpload: async function (_root, { file }) {
      const { createReadStream, filename, encoding, mimetype } = await file;
      const stream = createReadStream();

      const uploadPath = "files";
      const uploadFileName = `${randomBytes(6).toString("hex")}_${filename}`;
      const uploadFileUrl = path.join(uploadPath, uploadFileName);

      mkdirSync(uploadPath, { recursive: true });

      const output = createWriteStream(uploadFileUrl);

      stream.pipe(output);

      stream.on("error", (error) => output.destroy(error));

      await new Promise(function (resolve, reject) {
        output.on("close", () => {
          console.log("File uploaded");
          resolve();
        });

        output.on("error", (err) => {
          console.log(err);
          unlink(uploadFileUrl, () => {
            reject(err);
          });
        });
      });

      return { filename, mimetype, encoding };
    },
  },
};
