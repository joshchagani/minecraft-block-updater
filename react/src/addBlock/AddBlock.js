import React, { useState, useRef } from 'react'

function AddBlock() {
	const userFile = useRef(null)
	const [blockInfoString, setBlockInfoString] = useState({
		type: '',
		meta: '',
		name: '',
		textType: '',
		credit: '',
	})

	const handleChange = e =>
		setBlockInfoString({
			...blockInfoString,
			[e.target.name]: e.target.value,
		})

	const handleSubmit = e => {
		e.preventDefault()
		// const data = { ...blockInfoString, image: userFile.current.files[0] }
		const formData = new FormData()

		for (const k in blockInfoString) {
			formData.append(k, blockInfoString[k])
		}
		formData.append('image', userFile.current.files[0])

		fetch('http://localhost:4444/api/v1/', {
			'content-type': 'multipart/form-data',
			method: 'POST',
			body: formData,
		})
			.then(res => {
				return res
			})
			.then(success => console.info(success))
			.catch(err => err)
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
		return html
	}

	return (
		<>
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
			</div>
		</>
	)
}

export default AddBlock
