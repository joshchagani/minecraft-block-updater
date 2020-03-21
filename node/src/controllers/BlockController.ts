import { Request, Response, NextFunction } from 'express'
import * as mongodb from 'mongodb'
import * as formidable from 'formidable'
import { MongoHelper } from '../tools/MongoHelper'
import { ImageUpload } from '../tools/ImageUpload'
import { IBlock } from '../interfaces/Block'
import { cat } from 'shelljs'

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
			// If `req.params.id` has already been converted into a Hex then it does
			// not need to be converted with ObjectId().
			const regHex = /[0-9A-Fa-f]{6}/g
			const blockId = regHex.test(req.params.id)
				? await new mongodb.ObjectId(req.params.id)
				: req.params.id
			const collection = await BlockController.getCollection()
			const foundBlock = await collection.findOne({ _id: blockId })
			res.json(foundBlock)
		} catch (err) {
			console.error(err)
		}
	}

	public async addBlock(req: Request, res: Response, next: NextFunction) {
		try {
			const collection = await BlockController.getCollection()
			new formidable.IncomingForm().parse(req, async (err, fields, files) => {
				if (err) {
					console.error(err)
					next(err)
					return
				}
				if (files.image.type === 'image/png') {
					await new ImageUpload(
						`${files.image.path}`,
						`${fields.type}-${fields.meta}.png`,
					)
				}
				// Pull out 'image' from FromBody since it is only used
				// to pass in an image file
				const { image, ...fieldsForDb } = fields
				await collection.insertOne({
					...fieldsForDb,
				})
			})
		} catch (err) {
			console.error(err)
		}
		res.end()
	}

	public async editBlock(req: Request, res: Response, next: NextFunction) {
		try {
			const regHex = /[0-9A-Fa-f]{6}/g
			const blockId = regHex.test(req.params.id)
				? await new mongodb.ObjectId(req.params.id)
				: req.params.id
			const collection = await BlockController.getCollection()
			new formidable.IncomingForm().parse(req, async (err, fields, files) => {
				if (err) {
					console.error(err)
					next(err)
					return
				}

				if (typeof files.image !== 'undefined') {
					if (files.image.type === 'image/png') {
						await new ImageUpload(
							`${files.image.path}`,
							`${fields.type}-${fields.meta}.png`,
						)
					}
				}

				// Pull out 'image' from FromBody since it is only used
				// to pass in an image file
				const { image, ...fieldsForDb } = fields
				const updatedBlock = await collection.findOneAndUpdate(
					{ _id: blockId },
					{
						$set: {
							...fieldsForDb,
						},
					},
				)
				res.json(updatedBlock.ok)
			})
		} catch (err) {
			console.error(err)
		}
	}
}

export { BlockController }
