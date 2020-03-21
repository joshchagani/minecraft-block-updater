import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// Josh-made Components
import ListBlocks from '../listBlocks/ListBlocks'
import BlockInfo from '../blockInfo/BlockInfo'

// Images
import addBlock from './images/add-block.svg'
import listBlocks from './images/list-blocks.svg'

function Navigation() {
	return (
		<Router>
			<nav className="bg-black w-16 h-screen fixed top-0 left-0">
				<ul>
					<li className="text-white text-center pt-5">
						<Link to="/add-block">
							<img
								src={addBlock}
								alt="add block"
								className="w-12 h-12 mx-auto"
							/>
						</Link>
						Add
					</li>
					<li className="text-white text-center pt-5">
						<Link to="/">
							<img
								src={listBlocks}
								alt="list blocks"
								className="w-12 h-12 mx-auto"
							/>
						</Link>
						List
					</li>
				</ul>
			</nav>
			<Switch>
				<Route path="/block-info/:id">
					<BlockInfo singleBlock={true} />
				</Route>
				<Route path="/add-block/">
					<BlockInfo singleBlock={false} />
				</Route>
				<Route path="/">
					<ListBlocks />
				</Route>
			</Switch>
		</Router>
	)
}

export default Navigation
