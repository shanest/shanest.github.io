module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	"tufte": false,
	eleventyComputed: {
		year: (data) => {
			return new Date(data.date).getFullYear()
		},
	}
};
