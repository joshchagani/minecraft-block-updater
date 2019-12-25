const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const blockSchema = new Schema({
	type: String,
	meta: String,
	name: String,
	textType: String,
	hqImage: Boolean,
	expandable: Boolean,
	credit: String,
})

module.exports = mongoose.model('Block', blockSchema, 'blocks')
