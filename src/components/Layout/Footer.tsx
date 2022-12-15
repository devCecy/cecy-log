import styled from "@emotion/styled";

const Footer = () => {
	return (
		<Wrapper>
			<a
				href="mailto:im.ceciliaan@gmail.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				im.ceciliaan@gmail.com
			</a>
			<a
				href="https://github.com/devCecy"
				target="_blank"
				rel="noopener noreferrer"
			>
				github
			</a>
		</Wrapper>
	);
};

export default Footer;

const Wrapper = styled.footer`
	display: flex;
	flex: 1;
	padding: 2rem 0;
	border-top: 1px solid #eaeaea;
	justify-content: center;
	align-items: center;
	column-gap: 30px;

	a {
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			color: #e5ba73;
		}
	}
`;
