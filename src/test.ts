import fs from 'fs'

import crop from './crop'

const start = async () => {
	try {
		const readStream = fs.createReadStream('input.png')
		const writeStream = fs.createWriteStream('output.webp')

		await crop(readStream, writeStream)
	} catch (e) {
		console.error(e)
	}
}

start()
