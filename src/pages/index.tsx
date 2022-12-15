import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>devCecy's log</title>
				<meta name="description" content="devCecy의 블로그입니다." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>cecy log start!</main>

			<footer className={styles.footer}>
				<a
					href="mailto:im.ceciliaan@gmail.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					im.ceciliaan@gmail.com
				</a>
			</footer>
		</div>
	);
};

export default Home;
