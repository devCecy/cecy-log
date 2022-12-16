import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { IPost } from "../../interface/posts";

// components
import PostDetail from "../../components/Post/PostDetail";
import PostItem from "../../components/Post/PostItem";

type Props = {
	post: IPost;
	morePosts: IPost[];
	preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}
	return (
		<>
			<NextSeo title={post.title} description={post.description} />
			{router.isFallback ? (
				<title>Loading…</title>
			) : (
				<>
					<PostItem post={post} />
					<PostDetail content={post.content} />
				</>
			)}
		</>
	);
}

type Params = {
	params: {
		slug: string;
	};
};

export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.slug, [
		"title",
		"date",
		"slug",
		"description",
		"content",
		"tags",
		// "ogImage",
		"coverImage",
	]);
	const content = await markdownToHtml(post.content || "");

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
}

export async function getStaticPaths() {
	const posts = getAllPosts(["slug"]);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}
