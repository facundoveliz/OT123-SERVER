/* eslint-disable no-console */
import S3 from 'react-aws-s3'

const fileName = (file) => {
  const uuid = crypto.randomUUID() // Generate a Universally Unique Identifier.
  const fileNameArr = file.name.split('.') // Split the file name into arrays when it finds '.'
  const fileExtension = fileNameArr[fileNameArr.length - 1] // Extract just the file extension.
  const uniqueFileName = `${uuid}.${fileExtension}` // Create the new Unique filename.
  return uniqueFileName
}

function uploadFile(file, dirName) {
  const newFileName = fileName(file)
  console.log(newFileName);

  const config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
    dirName, /* optional */
    region: process.env.REACT_APP_AWS_S3_REGION,
    accessKeyId: process.env.REACT_APP_AWS_S3_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET,
  }

  const ReactS3Client = new S3(config);

  return new Promise((resolve, reject) => {
    ReactS3Client
      .uploadFile(file, newFileName)
      .then((data) => {
        resolve(data)
      }).catch((err) => {
        console.error('🚀 ~ file: s3helper.js ~ line 26 ~ .then ~ err', err)
        reject(err)
      })
  })
}

export default uploadFile
