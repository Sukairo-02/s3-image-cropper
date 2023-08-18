import { S3 } from 'aws-sdk'
import stream from 'stream'

import crop from './crop'

const start = async () => {
	try {
		const s3 = new S3(/* YOUR CREDENTIALS (if needed) GO HERE */)

		const readStream = s3
			.getObject({
				Bucket: '%inputBucketName%',
				Key: '%inputFileName%'
			})
			.createReadStream()

		const writeStream = new stream.PassThrough()
		await s3.upload({ Bucket: '%outputBucketName%', Key: '%outputFileName%', Body: writeStream }).promise()

		await crop(readStream, writeStream)
	} catch (e) {
		console.error(e)
	}
}

start()
