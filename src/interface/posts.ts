export type IPost = {
	title: string;
	description: string;
	date: string;
	tags: string[];
	slug: string;
	coverImage: string;
	content: string;
	ogImage: {
		url: string;
	};
};
