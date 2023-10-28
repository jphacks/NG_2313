export const sendMessage = async (message: string): Promise<string> => {
  const resp = await window.ipc.question(message);
  return resp.answer;
};
