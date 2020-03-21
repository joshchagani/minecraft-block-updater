import React, { useEffect, useState, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function BlockInfo() {
	const { id } = useParams()
	const userFile = useRef(null)
	const [isRedirect, setIsRedirect] = useState(false)
	const [fetchUrl, setFetchUrl] = useState(null)
	const [fetchParams, setFetchParams] = useState({})
	const [blockInfoString, setBlockInfoString] = useState(null)
	const [imageUrl, setImageUrl] = useState(null)

	const res = useFetch(fetchUrl, fetchParams)

	useEffect(() => {
		if (id) {
			setFetchUrl(`http://localhost:4444/api/v1/${id}`)

			if (res.response) {
				setBlockInfoString({
					type: res.response.type,
					meta: res.response.meta,
					name: res.response.name,
					textType: res.response.textType,
					credit: res.response.credit,
				})
				setImageUrl(`${res.response.type}-${res.response.meta}`)
			}
		} else {
			setBlockInfoString({
				type: '',
				meta: '',
				name: '',
				textType: '',
				credit: '',
			})
		}

		// Force redirect on POST and PUT
		if (res.response === 1) {
			setIsRedirect(true)
		}
	}, [id, res.response])

	const handleChange = e =>
		setBlockInfoString({
			...blockInfoString,
			[e.target.name]: e.target.value,
		})

	const handleSubmit = e => {
		e.preventDefault()
		const formData = new FormData()
		for (const k in blockInfoString) {
			formData.append(k, blockInfoString[k])
		}

		if (userFile.current.files.length === 1) {
			formData.append('image', userFile.current.files[0])
		}

		if (id) {
			setFetchUrl(`http://localhost:4444/api/v1/${id}`)
			setFetchParams({
				method: 'PUT',
				body: formData,
			})
		} else {
			setFetchUrl(`http://localhost:4444/api/v1/`)
			setFetchParams({
				method: 'POST',
				body: formData,
			})
		}
	}

	const forceRedirect = () => {
		if (isRedirect) {
			window.location = '/'
		}
	}

	const createForm = () => {
		const html = []
		for (const k in blockInfoString) {
			html.push(
				<div className="w-full" key={k}>
					<label htmlFor={k}>{k}</label>
					<input
						className="block w-full border-solid border-2 border-gray-200"
						name={k}
						value={blockInfoString[k]}
						type="text"
						id={k}
						onChange={handleChange}
					/>
				</div>,
			)
		}
		if (id && imageUrl) {
			html.push(
				<img
					alt={blockInfoString.name}
					key={1}
					className="block w-48 h-48"
					src={`https://randomrespawn-minecraft-database.s3.amazonaws.com/lg/${imageUrl}.png`}
				/>,
			)
		}
		return html
	}

	return (
		<>
			{forceRedirect()}
			{res.loadingState === 'loading' ? (
				<div className="h-screen flex items-center justify-center text-xl">
					Loading...
				</div>
			) : (
				<div className="w-screen h-screen flex justify-center items-center">
					<form
						method="POST"
						encType="multipart/form-data"
						onSubmit={handleSubmit}
					>
						{createForm()}
						<label
							htmlFor="image"
							className="inline-block mt-4 border-solid border-2 border-gray-200 rounded-md bg-white py-2 px-6 cursor-pointer hover:bg-gray-100"
						>
							Choose File
						</label>
						<input
							className="block absolute invisible"
							name="image"
							id="image"
							type="file"
							ref={userFile}
							accept="image/png"
						/>
						<input
							className="block mt-4 border-solid border-2 border-gray-200 rounded-md bg-white py-2 px-6 cursor-pointer hover:bg-gray-100"
							type="submit"
							value="Submit"
						/>
					</form>
					{isRedirect && <Redirect to="/" />}
				</div>
			)}
		</>
	)
}

export default BlockInfo
