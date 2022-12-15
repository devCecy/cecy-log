import type { NextPage } from "next";
import styled from "@emotion/styled";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../lib/api";

// components
import PostItem from "../components/Post/PostItem";

const Home: NextPage = ({ allPosts }: any) => {
	return (
		<>
			<Head>
				<title>DEVCECY LOG</title>
				<meta name="description" content="devCecy의 블로그입니다 :-)" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			{/* 포스트 리스트 */}
			{allPosts.map((post: any, idx: string) => (
				<PostList key={idx} href={`/posts/${post.slug}`}>
					<PostItem post={post} />
				</PostList>
			))}
		</>
	);
};

export default Home;

export const getStaticProps = async () => {
	const allPosts = getAllPosts([
		"title",
		"description",
		"date",
		"tags",
		"coverImage",
		"slug",
	]);

	return {
		props: { allPosts },
	};
};
const PostList = styled(Link)`
	width: 100%;
	margin-bottom: 30px;
	padding: 20px;
	&:hover {
		transition: 0.1s ease-in-out;
		background-color: #fafafa;
		border-radius: 10px;
	}

	@media screen and (max-width: 1280px) {
		padding: 0;
	}
`;
