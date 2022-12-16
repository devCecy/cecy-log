import type { AppProps } from "next/app";

// emotion theme
import GlobalStyle from "../../styles/globals";
import theme from "../../styles/theme";
import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";

// google analytics
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";

// components
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url: string) => {
			gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

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
