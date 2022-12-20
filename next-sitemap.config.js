/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: "https://devcecy.me",
	changefreq: "daily",
	generateIndexSitemap: true,
	generateRobotsTxt: true,
	sitemapSize: 7000,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
		additionalSitemaps: ["https://devcecy.me/sitemap-0.xml"],
	},
};
