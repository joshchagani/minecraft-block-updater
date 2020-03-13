import { Request, Response, NextFunction } from 'express'
import { MongoHelper } from '../tools/MongoHelper'
import * as mongodb from 'mongodb'
import { ImageUpload } from '../tools/ImageUpload'

class BlockController {

	private static getCollection() {
		return MongoHelper.client.db(process.env.DATABASE_NAME).collection(process.env.DATABASE_COLLECTION)
	}

	public getAllBlocks(req: Request, res: Response, next: NextFunction) {
		const collection = BlockController.getCollection()
		collection.find({}).toArray((err, items) => {
			if (err) {
				res.status(500)
				res.end()
				console.error(err)
			} else {
				res.json(items)
			}
		})
	}

	public addBlock(req: Request, res: Response, next: NextFunction) {
		const newBlock = req.body
		const collection = BlockController.getCollection()
		collection.insert({})
		res.end()
	}

	public editBlock(req: Request, res: Response, next: NextFunction) {
		const editBlock = req.body
		const collection = BlockController.getCollection()
		const id = req.params._id

		collection.findOneAndUpdate({ _id: new mongodb.ObjectId(id) }, { $set: {} })
		res.end()
	}

	public test(req: Request, res: Response, next: NextFunction) {
		const x = new ImageUpload(`${process.cwd()}/dist/tools/195-0.png`)
		// x.beginUploadProcess()
		res.send('finished')
	}
}

export { BlockController }
