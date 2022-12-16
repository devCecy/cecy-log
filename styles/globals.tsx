import { Global, css } from "@emotion/react";

const style = css`
	@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap");
	html,
	body {
		padding: 0;
		margin: 0;
		font-family: "Noto Sans KR", sans-serif;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	* {
		box-sizing: border-box;
	}
`;

const GlobalStyle = () => {
	return <Global styles={style} />;
};

export default GlobalStyle;
