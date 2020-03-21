import 'dotenv/config'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { Routes } from './routes'
import { MongoHelper } from './tools/MongoHelper'
import { Cors } from './middleware/Cors'

class Server {
	public app: Application
	public upload: any
	public route: Routes = new Routes()

	constructor() {
		this.app = express()
		this.config()
		this.route.routes(this.app)
		this.startServer()
	}

	// All middleware added here
	private config(): void {
		this.app.use(bodyParser.urlencoded({ extended: true }))
		this.app.use(bodyParser.json())
		this.app.use(Cors.corsOptions)
	}

	public startServer(): void {
		// Start listening
		this.app.listen(process.env.PORT, async () => {
			console.log(`Listening on port ${process.env.PORT}`)
			try {
				await MongoHelper.connect(process.env.DATABASE_URI)
				console.info(`Connected to DB → 👍 👍 👍`)
			} catch (err) {
				console.error(err)
			}
		})
	}
}

new Server()
