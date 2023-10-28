const baseUrl = "http://localhost:8000";

const collection = "collection_1";

const arrayBufferToBase64 = (buf: ArrayBuffer): string => {
  let s = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) {
    s += String.fromCharCode(bytes[i]);
  }

  return btoa(s);
};

const validateResp = (resp: Response) => {
  if (resp.status !== 200) {
    throw Error(`response status is ${resp.status}: ${resp.statusText}`);
  }
};

export const sendPdf = async (data: ArrayBuffer) => {
  const body = {
    collection_name: collection,
    pdf: arrayBufferToBase64(data),
  };

  const resp = await fetch(`${baseUrl}/pdf`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  validateResp(resp);
};

export type QuestionResp = {
  answer: string;
  status: string;
};

export const sendQuestion = async (question: string): Promise<QuestionResp> => {
  const body = {
    collection_name: collection,
    question,
  };

  const resp = await fetch(`${baseUrl}/question`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  validateResp(resp);

  const respBody = await resp.text();
  return JSON.parse(respBody);
};
