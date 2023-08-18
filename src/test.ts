import fs from 'fs'

import crop from './crop'
import bufferType from './bufferType'

const start = async () => {
	try {
		const readStream = fs.createReadStream('input.png')
		const writeStream = fs.createWriteStream('output.webp')

		await crop(readStream, writeStream)
	} catch (e) {
		console.error(e)
	}
}

const bufferTest = async () => {
	try {
		const input = fs.readFileSync('input.png')

		const result = await bufferType(input)

		await fs.writeFileSync('bufferType.webp', result)
	} catch (e) {
		console.error(e)
	}
}

start()
bufferTest()
