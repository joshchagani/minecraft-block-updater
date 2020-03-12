import { Application } from 'express'
import { BlockController } from '../controllers/BlockController'

class Routes {
	public blockController: BlockController = new BlockController()
	
	public routes(app: Application): void {
		app.route('/api/v1/').get(this.blockController.getAllBlocks)
		app.route('/api/v1').post(this.blockController.addBlock)
		app.route('/api/v1/:block').put(this.blockController.editBlock)
	}
}

export { Routes }
