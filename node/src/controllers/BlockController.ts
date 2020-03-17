import e, { Request, Response, NextFunction } from 'express'
import * as mongodb from 'mongodb'
import * as formidable from 'formidable'
import { MongoHelper } from '../tools/MongoHelper'
import { ImageUpload } from '../tools/ImageUpload'
import { IBlock } from '../interfaces/Block'

class BlockController {
	private static getCollection() {
		return MongoHelper.client
			.db(process.env.DATABASE_NAME)
			.collection(process.env.DATABASE_COLLECTION)
	}

	public async getAllBlocks(req: Request, res: Response, next: NextFunction) {
		try {
			const collection = await BlockController.getCollection()
			await collection.find({}).toArray((err, items) => {
				if (err) {
					res.status(500)
					res.end()
					console.error(err)
				} else {
					res.json(items)
				}
			})
		} catch (err) {
			console.error(err)
		}
	}

	public async getOneBlock(req: Request, res: Response, next: NextFunction) {
		try {
			const collection = await BlockController.getCollection()
			const blockId = new mongodb.ObjectId(req.params.id)
			const foundBlock = await collection.findOne({ _id: blockId })
			res.json(foundBlock)
		} catch (err) {
			console.error(err)
		}
	}

	public async addBlock(req: Request, res: Response, next: NextFunction) {
		const collection = await BlockController.getCollection()
		new formidable.IncomingForm().parse(req, async (err, fields, files) => {
			if (err || files.image.type !== 'image/png') {
				console.error(err)
				next(err)
				return
			}
			await collection.insert({
				...fields,
			})
			await new ImageUpload(
				`${files.image.path}`,
				`${fields.type}-${fields.meta}.png`,
			)
			res.redirect('/')
		})
		res.end()
	}

	public async editBlock(req: Request, res: Response, next: NextFunction) {
		try {
			const collection = await BlockController.getCollection()
			const { type, meta, name, textType, hqImage, credit } = req.body
			const id = req.params.id
			const updatedBlock = await collection.findOneAndUpdate(
				{ _id: new mongodb.ObjectId(id) },
				{
					$set: {
						type,
						meta,
						name,
						textType,
						hqImage,
						credit,
					},
				},
			)
			res.json(updatedBlock.ok)
			res.end()
		} catch (err) {
			console.error(err)
		}
	}
}

export { BlockController }
