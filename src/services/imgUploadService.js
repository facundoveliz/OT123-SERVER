import S3 from 'react-aws-s3'

const config = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
  s3Url: process.env.REACT_APP_AWS_S3_URL,
  region: process.env.REACT_APP_AWS_S3_REGION,
  accessKeyId: process.env.REACT_APP_AWS_S3_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET,
}

const ReactS3Client = new S3(config);

const fileName = (file) => {
  const uuid = crypto.randomUUID() // Generate a Universally Unique Identifier.
  const fileNameArr = file.name.split('.') // Split the file name into arrays when it finds '.'
  const fileExtension = fileNameArr[fileNameArr.length - 1] // Extract just the file extension.
  const uniqueFileName = `${uuid}.${fileExtension}` // Create the new Unique filename.
  return uniqueFileName
}
const imgUploadService = async (file) => {
  const newFileName = fileName(file)

  return ReactS3Client.uploadFile(file, newFileName)
    .then((response) => response)
    .catch((error) => error)
}
export default imgUploadService
