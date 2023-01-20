import { NextSeo } from "next-seo";
import type { NextPage } from "next";
import styled from "@emotion/styled";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../lib/api";

// components
import PostItem from "../components/Post/PostItem";
import { useRouter } from "next/router";

const Home: NextPage = ({ allPosts }: any) => {
	const router = useRouter();
	return (
		<>
			<NextSeo
				title="DEVCECY LOG"
				description="안녕하세요, 프론트엔드 개발자 안미현입니다. 저의 기록이 개발 생태계에 조금이나마 도움이 되었으면 합니다."
			/>
			{/* 포스트 리스트 */}
			{allPosts.map((post: any, idx: string) => (
				<PostList
					key={idx}
					onClick={() => {
						router.push(`/posts/${post.slug}`);
					}}
				>
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
const PostList = styled.div`
	width: 100%;
	margin-bottom: 30px;
	padding: 20px;

	&:hover {
		transition: 0.1s ease-in-out;
		background-color: #fafafa;
		border-radius: 10px;
		cursor: pointer;
	}

	@media screen and (max-width: 480px) {
		padding: 0;
	}
`;
