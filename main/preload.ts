import { contextBridge, ipcRenderer } from "electron";
import { Document } from "../renderer/src/types/document";
import { QuestionResp } from "./helpers/api";

const handler = {
  loadFiles: async (): Promise<Document[]> => {
    const docs = await ipcRenderer.invoke("loadFiles");
    return docs as Document[];
  },
  saveFiles: async (files: File[]): Promise<Document[]> => {
    const docs: Document[] = [];
    for (const file of files) {
      const data = await file.arrayBuffer();
      docs.push({ name: file.name, data });
    }

    await ipcRenderer.invoke("saveFiles", docs);
    return docs;
  },
  pdf: async (documents: Document[]) => ipcRenderer.invoke("pdf", documents),
  conversation: async (message: string): Promise<QuestionResp> =>
    ipcRenderer.invoke("conversation", message),
  question: async (q: string): Promise<QuestionResp> =>
    ipcRenderer.invoke("question", q),
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
