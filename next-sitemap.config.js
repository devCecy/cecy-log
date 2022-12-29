/** @type {import('next-sitemap').IConfig} */

module.exports = {
	siteUrl: "https://devcecy.me",
	changefreq: "daily",
	generateIndexSitemap: true,
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
		additionalSitemaps: ["https://example.com/server-sitemap.xml"],
	},
};
