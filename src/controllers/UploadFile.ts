import { Request, Response } from "express";

import { Storage } from "@google-cloud/storage";

const UploadController = {
  async store(req: Request, res: Response) {
    try {
      const file = req.files[0];

      const storage = new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
      });


      const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);
      const blob = bucket.file(file.originalname);

      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobWriter.on("error", (err) => {
        return res.status(500).json(err);
      });

      blobWriter.on("finish", async () => {
        const signedUrls = await blob.getSignedUrl({
          action: "read",
          expires: "03-09-3000",
        });

        return res
          .status(200)
          .send({ fileName: file.originalname, fileLocation: signedUrls });
      });

      blobWriter.end(file.buffer);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default UploadController;
