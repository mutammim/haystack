import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Haystack</title>
				<meta name="description" content="Haystack" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>Main content of webpage!</main>
		</div>
	);
};

export default Home;
