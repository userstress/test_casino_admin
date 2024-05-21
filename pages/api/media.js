/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import multer from "multer"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import multerS3 from "multer-s3"

const AWS_S3_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
const CDNS = process.env.NEXT_PUBLIC_CDN_ADDRESS

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID_PER,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_PER,
  },
})

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: AWS_S3_BUCKET_NAME,
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `${Date.now().toString()} - ${file.originalname}`)
    },
  }),
}).array("upload", 1)

export default async (req, res) => {
  await new Promise((resolve, reject) => {
    upload(req, res, function (error) {
      if (error) {
        console.log(error)
        return res.status(404).end()
      }
      const cloudFrontUrl = `${CDNS}${req.files[0].key}`

      res.status(201).json({ url: cloudFrontUrl })
      console.log(cloudFrontUrl)

      resolve()
    })
  }).catch((error) => {
    console.error("Failed to upload file:", error)
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
