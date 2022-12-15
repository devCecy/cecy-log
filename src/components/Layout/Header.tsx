import styled from "@emotion/styled";
import Link from "next/link";

const Header = () => {
	return (
		<Wrapper>
			<NavItem href="/" style={{ fontWeight: "bold" }}>
				DEVCECY LOG
			</NavItem>
			<NavItem href="/about">about</NavItem>
		</Wrapper>
	);
};

export default Header;

const Wrapper = styled.nav`
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	padding: 0 50px;
	height: 60px;
	background-color: hsla(0, 0%, 100%, 0.8);
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: 1280px) {
		padding: 0 20px;
	}
`;

const NavItem = styled(Link)`
	text-decoration: none;
	font-size: 1.25rem;
	&:active,
	&:focus {
		color: initial;
	}
	&:hover {
		color: initial;
	}
`;
