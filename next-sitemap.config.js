/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: "https://devcecy.me",
	changefreq: "daily",
	generateIndexSitemap: false,
	generateRobotsTxt: true,
	exclude: ["/server-sitemap.xml"],
	// sitemapSize: 100000,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
		additionalSitemaps: ["https://devcecy.me/server-sitemap.xml"],
	},
};
