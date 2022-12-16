/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: "https://devcecy.com",
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
