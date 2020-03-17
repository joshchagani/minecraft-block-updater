import sharp from 'sharp'
import mkdirp from 'mkdirp'
import { v4 as uuidv4 } from 'uuid'

export class ImageResize {
	public static resize(dirPath: string, filePath: string, imageSize: number) {
		const tmpFolder = dirPath
		const fileName = `${uuidv4()}.png`
		mkdirp(tmpFolder).then()
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
