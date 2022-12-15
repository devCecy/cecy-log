import styled from "@emotion/styled";
import Link from "next/link";

const PostItem = ({ post }: any) => {
	const { title, description, date, tags } = post;

	return (
		<Wrapper>
			<Title>{title}</Title>
			<Description>{description}</Description>
			<Extra>
				<PublishedDate>{date}</PublishedDate>
				<TagList>
					{tags?.map((tag: any) => (
						<Tag key={tag + `tag`}>
							<Link href={`/tags/${tag}/`}>{`#${tag}`}</Link>
						</Tag>
					))}
				</TagList>
			</Extra>
		</Wrapper>
	);
};

export default PostItem;

const Wrapper = styled.article`
	width: 100%;
	margin-bottom: 20px;
`;

const Title = styled.h1`
	word-break: keep-all;
	overflow-wrap: break-word;
`;

const Description = styled.div`
	word-break: keep-all;
	overflow-wrap: break-word;
	margin-top: 12px;
	color: #393e46;
`;

const Extra = styled.div`
	margin: 16px 0;
	display: flex;
	align-items: center;
	font-size: 0.75em;
`;

const PublishedDate = styled.time`
	display: block;
`;

const TagList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const Tag = styled.li`
	list-style-type: none;
	&:not(:last-child) {
		margin-right: 8px;
	}
`;
