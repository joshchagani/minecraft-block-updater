const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const path = require('path')

module.exports = {
	plugins: [
		require('postcss-import'),
		tailwindcss('./tailwind.config.js'),
		require('postcss-nested'),
		require('autoprefixer'),
		...(process.env.NODE_ENV === 'production'
			? [
					purgecss({
						content: [
							path.join('src', '*.html'),
							path.join('src', '*.js'),
							path.join('src', '*.jsx'),
						],
						defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
					}),
			  ]
			: []),
	],
}
