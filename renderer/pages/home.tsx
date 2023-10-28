import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home: React.FunctionComponent = () => (
  <React.Fragment>
    <Head>
      <title>Home - LLM Personal Assistant</title>
    </Head>
    <div className="gird mt-20 w-full grid-cols-1 text-center">
      <h1 className="text-5xl">LLM Personal Assistant</h1>
      <div className="mt-5">
        <Image
          className="mx-auto"
          src="/images/logo.png"
          alt="Logo image"
          width="256px"
          height="256px"
        />
      </div>
    </div>
    <div className="mt-5 flex w-full flex-wrap justify-center">
      <Link href="/next">
        <a className="btn-blue">Talk with your assistant</a>
      </Link>
    </div>
  </React.Fragment>
);

export default Home;
