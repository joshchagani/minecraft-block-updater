import { MongoClient } from 'mongodb'

export class MongoHelper {
	public static client: MongoClient
	public static connect(url: string) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, { useUnifiedTopology: true }, (err, client: MongoClient) => {
				if (err) {
					reject(err)
				} else {
					MongoHelper.client = client
					resolve(client)
				}
			})
		})
	}
}
