import * as fs from 'fs'
import * as AWS from 'aws-sdk'

interface IS3Params {
	Bucket: string;
	Key: string;
	ACL?: string;
	ContentType: string;
	Body: any;
}

export class ImageUpload {
	#fileContent: any
	#filePath: any
	#s3: AWS.S3
	#s3params: IS3Params
	#ID: string
	#SECRET: string
	#BUCKET: string
	#REGION: string

	constructor(filePath: any) {
		this.#ID = process.env.AWS_ACCESS_ID
		this.#SECRET = process.env.AWS_SECRET_KEY
		this.#BUCKET = process.env.AWS_BUCKET
		this.#REGION = process.env.AWS_REGION
		this.#filePath = filePath
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
			this.#fileContent = await fs.promises.readFile(this.#filePath).then(data => { return data })
	}

	private setAWSParams() {
		this.#s3params = {
			Bucket: this.#BUCKET,
			Body: this.#fileContent,
			ACL:'public-read',
			ContentType: 'image/png',
			Key: `test/test-1.png`,
		}
	}

	private renameFile() {

	}

	private async upload() {
		const uploadLocation = await this.#s3.upload(this.#s3params).promise()
		console.info(uploadLocation.Location)
	}
}
