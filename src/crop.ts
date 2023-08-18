import sharp from 'sharp'

import { Readable, Writable } from 'stream'

const defaultDimensions = {
	width: 500,
	height: 500
}

/**
 * Crops image and converts it to `.webp` format
 */
export default (inStream: Readable, outStream: Writable, dimensions = defaultDimensions) => {
	if (dimensions.width <= 0 || dimensions.height <= 0)
		throw new Error('Image Cropper Error: invalid dimensions - height and width must be greater than zero')

	const cropperPipeline = sharp()
	cropperPipeline.resize(dimensions).toFormat('webp').pipe(outStream)

	inStream.pipe(cropperPipeline)

	return new Promise<void>((resolve, reject) => {
		outStream.on('finish', () => {
			inStream.destroy()
			outStream.end().destroy()

			resolve()
		})

		outStream.on('error', (e) => {
			inStream.destroy()
			outStream.end().destroy()

			reject(e)
		})
	})
}
