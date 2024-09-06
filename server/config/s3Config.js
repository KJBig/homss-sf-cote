import aws from 'aws-sdk';

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRETACCESS_KEY,
    region: process.env.AWS_S3_REGION
});


export default s3;