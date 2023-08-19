import fs from 'fs'

import crop from './crop'
import bufferType from './bufferType'

const start = async () => {
	try {
		const readStream = fs.createReadStream('input.png')
		const writeStream = fs.createWriteStream('output.webp')

		await crop(readStream, writeStream, { height: 200.5, width: 190.5 })
	} catch (e) {
		console.error(e)
	}
}

const bufferTest = async () => {
	try {
		const input = fs.readFileSync('input.png')

		const result = await bufferType(input, { height: 200.5, width: 190.5 })

		await fs.writeFileSync('bufferType.webp', result)
	} catch (e) {
		console.error(e)
	}
}

start()
bufferTest()
