module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	eleventyComputed: {
		year: (data) => {
			return new Date(data.date).getFullYear()
		},
	}
};
