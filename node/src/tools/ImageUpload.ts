import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import { IS3Params } from '../interfaces/S3Params'
import { ImageResize } from './ImageResize'
import { CleanTempFolder } from './CleanTempFolder'

export class ImageUpload {
	#fileContentLg: any
	#fileContentSm: any
	#filePath: any
	#dirPath: string
	#s3: AWS.S3
	#s3paramsLg: IS3Params
	#s3paramsSm: IS3Params
	#ID: string
	#SECRET: string
	#BUCKET: string
	#REGION: string
	#blockName: string

	constructor(filePath: any, blockName: string) {
		this.#ID = process.env.AWS_ACCESS_ID
		this.#SECRET = process.env.AWS_SECRET_KEY
		this.#BUCKET = process.env.AWS_BUCKET
		this.#REGION = process.env.AWS_REGION
		this.#filePath = filePath
		this.#dirPath =  `${process.cwd()}/tmp/`
		this.#blockName = blockName
		this.configAWS()
		this.beginUploadProcess()
	}

	private async beginUploadProcess() {
		try {
			await this.readFile()
			this.setAWSParams()
			await this.upload()
		} catch (err) {
			console.error(err)
		}
	}

	private configAWS() {
		AWS.config.update({
			region: this.#REGION
		});
		this.#s3 = new AWS.S3({
			accessKeyId: this.#ID,
			secretAccessKey: this.#SECRET
		})
	}

	private async readFile() {
		const lg = ImageResize.resize(this.#dirPath, this.#filePath, 300).then(async fileName => {
			this.#fileContentLg = await fs.promises.readFile(`${fileName}`).then(data => { return data })
		})
		const sm = ImageResize.resize(this.#dirPath, this.#filePath, 32).then(async fileName => {
			this.#fileContentSm = await fs.promises.readFile(`${fileName}`).then(data => { return data })
		})
		await Promise.all([lg, sm])
	}

	private setAWSParams() {
		this.#s3paramsLg = {
			Bucket: this.#BUCKET,
			Body: this.#fileContentLg,
			ACL:'public-read',
			ContentType: 'image/png',
			Key: `lg/${this.#blockName}`,
		}
		this.#s3paramsSm = {
			Bucket: this.#BUCKET,
			Body: this.#fileContentSm,
			ACL:'public-read',
			ContentType: 'image/png',
			Key: `sm/${this.#blockName}`,
		}
	}

	private async upload() {
		const lg = this.#s3.upload(this.#s3paramsLg).promise()
		const sm = this.#s3.upload(this.#s3paramsSm).promise()
		await Promise.all([lg, sm]).then(images => {
			console.info(`Uploaded ${images.length} images(s)`)
		}
		).then(() => {
			CleanTempFolder.clean(this.#dirPath)
		})
		.catch(err => {
			console.error('S3 upload went janky', err)
		})
	}
}
