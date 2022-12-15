import { ReactNode } from "react";
import styled from "@emotion/styled";

// components
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</>
	);
};

export default Layout;

const Main = styled.main`
	width: 60%;
	margin: 50px auto;
	min-height: 100vh;
	padding: 4rem 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 1280px) {
		width: 80%;
	}
`;
