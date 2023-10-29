import * as fs from "fs";

import { ipcMain } from "electron";

import { Document } from "../../renderer/src/types/document";
import { QuestionResp, sendConversation, sendPdf, sendQuestion } from "./api";

const pdfDir = "./NG_2313_1/pdf";

export const setIpcHandler = (): void => {
  ipcMain.handle("loadFiles", (): Document[] => {
    const filenames = fs.readdirSync(pdfDir).filter((v) => v.endsWith(".pdf"));

    const docs: Document[] = [];
    for (const name of filenames) {
      const data = fs.readFileSync(`${pdfDir}/${name}`);
      docs.push({ name, data });
    }

    return docs;
  });

  ipcMain.handle("saveFiles", (_, files: Document[]) => {
    for (const file of files) {
      fs.writeFileSync(`${pdfDir}/${file.name}`, Buffer.from(file.data));
    }
  });

  ipcMain.handle("pdf", async (_, documents: Document[]) => {
    for (const d of documents) {
      await sendPdf(d.data);
    }
  });

  ipcMain.handle(
    "conversation",
    async (_, message: string): Promise<QuestionResp> =>
      sendConversation(message),
  );

  ipcMain.handle(
    "question",
    async (_, question: string): Promise<QuestionResp> =>
      sendQuestion(question),
  );
};
