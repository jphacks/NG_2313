import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import { sendMessage } from "../../src/services/chatService";

interface Message {
  speaker: "Assistant" | "You";
  text: string;
}

const Documents: React.FunctionComponent = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      speaker: "Assistant",
      text: "こんにちは。あなたのパーソナルアシスタントです。",
    },
    {
      speaker: "Assistant",
      text: "何なりとお申し付けください。",
    },
  ]);

  const send = (): void => {
    if (input === "") return;

    const trimmed = input.trim();

    const newMessage: Message = { speaker: "You", text: trimmed };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    void (async () => {
      const resp = await sendMessage(trimmed);
      const respMessage: Message = { speaker: "Assistant", text: resp };
      setMessages((prev) => [...prev, respMessage]);
    })();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    send();
  };

  return (
    <React.Fragment>
      <div className="relative flex h-full flex-col">
        <h2 className="text-center underline">Chat</h2>
        <div className="mt-5 flex flex-auto flex-col overflow-auto pb-16 text-lg">
          {messages.map(({ speaker, text }: Message, i) => (
            <p key={i}>
              {speaker} : {text}
            </p>
          ))}
        </div>
        <div className="absolute bottom-2 w-full pl-2 pr-7 text-lg">
          <input
            className="w-full rounded-full border-2 border-gray-200 bg-gray-100 py-2 pl-5 pr-16 text-gray-800 placeholder-gray-600 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none"
            type="text"
            placeholder="Say something..."
            autoComplete="off"
            autoFocus={true}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 right-9 flex items-center">
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition duration-200 ease-in-out hover:bg-blue-600 focus:outline-none"
              type="button"
              onClick={send}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Documents;
