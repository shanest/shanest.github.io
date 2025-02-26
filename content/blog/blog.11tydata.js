export default {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
	"tufte": false,
	"code": false,
	eleventyComputed: {
		year: (data) => {
			return new Date(data.date).getFullYear()
		},
	}
};
