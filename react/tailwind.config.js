// tailwind.config.js
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
	theme: {
		screens: {
			sm: '667px',
			md: '800px',
			lg: '1024px',
			xl: '1280px',
		},
		extend: {
			inset: {
				'1/5': '20%',
				'1/4': '25%',
				'1/3': '33%',
				'2/5': '40%',
				'1/2': '50%',
				'3/5': '60%',
				'2/3': '66%',
				'3/4': '75%',
				'4/5': '80%',
			},
			spacing: {
				'7': '1.75rem',
				'9': '2.25rem',
				'11': '2.75rem',
				'13': '3.25rem',
				'14': '3.5rem',
				'15': '3.75rem',
				'18': '4.5rem',
				'22': '5.5rem',
				'52': '13rem',
				'72': '18rem',
				'84': '21rem',
				'96': '24rem',
				'116': '29rem',
				'136': '34rem',
				'176': '44rem',
				'256': '64rem',
				'1/5': '20%',
				'1/4': '25%',
				'1/3': '33%',
				'2/5': '40%',
				'1/2': '50%',
				'3/5': '60%',
				'2/3': '66%',
				'3/4': '75%',
				'4/5': '80%',
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
			},
		},
	},
	variants: {},
	// going to be totally honest, I don't remember what these plugins do
	plugins: [
		// adding ::after psuedo elements
		function({ addVariant, e }) {
			addVariant('after', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) => `.${e(`after${separator}${className}`)}::after`,
				)
			})
		},
		// adding ::before psuedo elements
		function({ addVariant, e }) {
			addVariant('before', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) => `.${e(`before${separator}${className}`)}::before`,
				)
			})
		},
	],
}
