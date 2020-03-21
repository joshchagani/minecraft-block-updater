import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function ListBlocks() {
	const [loadingState, setLoadingState] = useState('loading')
	const [blocks, setBlocks] = useState([])
	const res = useFetch('http://localhost:4444/api/v1/')

	useEffect(() => {
		if (res.response) {
			setBlocks(res.response)
			setLoadingState('loaded')
		}
	}, [res.response])

	return (
		<>
			{loadingState === 'loading' ? (
				<div className="h-screen flex items-center justify-center text-xl">
					Loading...
				</div>
			) : (
				<div className="w-full">
					<div className="ml-18">
						<div className="block-grid">
							<span>Image</span>
							<span>Meta</span>
							<span>Name</span>
							<span>Text Type</span>
							<span>Edit</span>
							{blocks.map(block => (
								<React.Fragment key={block._id}>
									<span>
										<img
											src={`https://randomrespawn-minecraft-database.s3.amazonaws.com/sm/${block.type}-${block.meta}.png`}
											alt={`${block.name} by ${block.credit}}`}
											className="mx-auto"
										/>
									</span>
									<span>
										{block.type}-{block.meta}
									</span>
									<span>{block.name}</span>
									<span>{block.textType}</span>
									<span>
										<Link to={`/block-info/${block._id}`}>Edit</Link>
									</span>
								</React.Fragment>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ListBlocks
