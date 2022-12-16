import type { AppProps } from "next/app";

// emotion theme
import GlobalStyle from "../../styles/globals";
import theme from "../../styles/theme";
import { ThemeProvider } from "@emotion/react";

// components
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<GlobalStyle />
		</ThemeProvider>
	);
}

export default MyApp;
