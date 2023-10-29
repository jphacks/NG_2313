import Head from "next/head";
import React from "react";

import Chat from "./_chat";
import Documents from "./_documents";

const Next: React.FunctionComponent = () => (
  <React.Fragment>
    <Head>
      <title>Chat - LLM Personal Assistant</title>
    </Head>
    <div className="flex h-screen flex-col">
      <div className="mt-2 text-center">
        <h1 className="text-xl">LLM Personal Assistant</h1>
      </div>
      <div className="mt-2 flex min-h-0 flex-auto flex-row justify-around text-2xl">
        <div className="mx-1 w-32 flex-auto basis-1/3 border p-2">
          <Documents />
        </div>
        <div className="mx-1 w-64 flex-auto basis-11/12 border p-2">
          <Chat />
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Next;
