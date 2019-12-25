import React, { useState, useEffect } from 'react'

function ListBlocks() {
	// const [loadingBlocks, setLoadingBlocks] = useState(true)
	const [blocks, setBlocks] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const response = await fetch('http://localhost:8000/all-blocks')
		const data = await response.json()
		setBlocks(data)
	}

	return (
		<div className="w-full">
			<div className="ml-18">
				<div className="block-grid">
					<span>Image</span>
					<span>Meta</span>
					<span>Name</span>
					<span>Text Type</span>
					<span>HQ Image</span>
					<span>Expandable</span>
					{blocks.map(block => (
						<React.Fragment key={block._id}>
							<span>
								<img
									src={`https://randomrespawn.com/minecraftbuildlist/assets/items-sm/${block.type}-${block.meta}.png`}
									alt={`${block.name} by ${block.credit}}`}
									className="mx-auto"
								/>
							</span>
							<span>
								{block.type}-{block.meta}
							</span>
							<span>{block.name}</span>
							<span>{block.textType}</span>
							<span>{block.hqImage === true && `Yes`}</span>
							<span>{block.expandable === true && `Yes`}</span>
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	)
}

export default ListBlocks
