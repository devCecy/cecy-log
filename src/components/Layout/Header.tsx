import styled from "@emotion/styled";
import Link from "next/link";

const Header = () => {
	return (
		<Wrapper>
			<NavItem href="/" props="home">
				DEVCECY LOG
			</NavItem>
			<NavItem href="/about" props="menu">
				About
			</NavItem>
		</Wrapper>
	);
};

export default Header;

const Wrapper = styled.nav`
	width: 768px;
	margin: 0 auto;
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;

	height: 60px;
	background-color: hsla(0, 0%, 100%, 0.8);
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: 480px) {
		width: 100%;
		padding: 0 20px;
	}
`;

const NavItem = styled(Link)<{ props: string }>`
	text-decoration: none;
	font-weight: 600;

	${(props) => props.props === "home" && "font-size: 1.25rem;"}
	${(props) => props.props === "menu" && "font-size: 1rem"};

	&:active,
	&:focus {
		color: initial;
	}
	&:hover {
		color: initial;
	}
`;
