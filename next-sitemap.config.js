/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: "https://devcecy.me",
	changefreq: "daily",
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
	},
};
