import markdownStyles from "./markdown-styles.module.css";

type Props = {
	content: string;
};

const PostDetail = ({ content }: Props) => {
	return (
		<>
			<div
				className={markdownStyles["markdown"]}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</>
	);
};

export default PostDetail;
