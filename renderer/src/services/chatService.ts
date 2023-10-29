export const sendMessage = async (message: string): Promise<string> => {
  const resp = message.startsWith("pdf")
    ? await window.ipc.question(message)
    : await window.ipc.conversation(message);
  return resp.answer;
};
