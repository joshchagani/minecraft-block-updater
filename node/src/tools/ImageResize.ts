import sharp from 'sharp'
import mkdirp from 'mkdirp'
import { v4 as uuidv4 } from 'uuid'

export class ImageResize {
	public static resize(dirPath: string, filePath: string, imageSize: number) {
		// Random filename to avoid naming conflicts.
		// These files are temporary so final name doesn't matter
		const fileName = `${uuidv4()}.png`
		const tmpFolder = dirPath

		// Marking sure the /tmp/ directory exists.
		mkdirp(tmpFolder).then()

		// Sets the size of the image and saves it to the disk
		return sharp(filePath)
			.resize(imageSize, imageSize, { fit: 'inside' })
			.png()
			.toFile(tmpFolder + fileName)
			.then(info => {
				console.info(info)
				return tmpFolder + fileName
			})
			.catch(err => {
				console.error(err)
			})
	}
}
