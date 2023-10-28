import React from "react";
import Head from "next/head";
import Link from "next/link";

import Documents from "./_documents";
import Chat from "./_chat";

const Next: React.FunctionComponent = () => (
  <React.Fragment>
    <Head>
      <title>Chat - LLM Personal Assistant</title>
    </Head>
    <div className="flex h-screen flex-col">
      <div className="ml-2 mt-2 flex">
        <Link href="/home">
          <a className="btn-blue">Back to home</a>
        </Link>
      </div>
      <div className="mt-2 text-center">
        <h1 className="text-5xl">LLM Personal Assistant</h1>
      </div>
      <div className="mt-5 flex min-h-0 flex-auto flex-row justify-around text-2xl">
        <div className="mx-1 w-32 flex-auto basis-1/3 border p-2">
          <Documents />
        </div>
        <div className="mx-1 w-64 flex-auto basis-2/3 border p-2">
          <Chat />
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Next;
