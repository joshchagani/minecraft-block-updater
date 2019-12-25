const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Block = mongoose.model('Block')

exports.getBlocks = async (req, res) => {
	try {
		const blocksPromise = await Block.find()
		res.json(blocksPromise)
	} catch (err) {
		console.error(err)
		res.send({ message: "We ain't found sh**" })
	}
}
