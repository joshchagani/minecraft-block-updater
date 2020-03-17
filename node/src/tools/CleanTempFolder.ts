import * as fs from 'fs'
import * as path from 'path'

export class CleanTempFolder {
	public static clean(directory: string) {
		fs.readdir(directory, (err, files) => {
			if (err) throw err
			for (const file of files) {
				fs.unlink(path.join(directory, file), err => {
					if (err) throw err
				})
			}
		})
	}
}
