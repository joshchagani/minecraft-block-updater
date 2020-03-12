import cors from 'cors'

export class Cors {
	private static whitelist: string[] = ['*']
	public static corsOptions = cors({
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
		methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
		preflightContinue: false,
		optionsSuccessStatus: 204,
		origin: function(origin, callback) {
			if (Cors.whitelist.indexOf(origin) !== -1 || Cors.whitelist[0] === '*') {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'), false)
			}
		}
	})
}
