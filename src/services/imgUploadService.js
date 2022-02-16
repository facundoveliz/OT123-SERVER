/* eslint-disable quotes */
/* eslint-disable global-require */
/* eslint-disable no-console */
import S3 from 'react-aws-s3'

const fileName = () => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const uuid = crypto.randomUUID() // Generate a Universally Unique Identifier.
  // const fileNameArr = file.name.split('.') // Split the file name into arrays when it finds '.'
  // const fileExtensions = fileNameArr[fileNameArr.length - 1] // Extract just the file extension.

  const fileExtension = 'jpg'
  const uniqueFileName = `${uuid}.${fileExtension}` // Create the new Unique filename.
  return uniqueFileName
}

const config = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
  s3Url: process.env.REACT_APP_AWS_S3_URL,
  region: process.env.REACT_APP_AWS_S3_REGION,
  accessKeyId: process.env.REACT_APP_AWS_S3_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET,
}

const ReactS3Client = new S3(config);

export default async function UploadFile(file) {
  const newFileName = fileName()
  try {
    if (file) {
      const respuesta = await ReactS3Client.uploadFile(file, newFileName)
      console.log(respuesta);
    }
  } catch (error) {
    console.log(error);
  }
}
