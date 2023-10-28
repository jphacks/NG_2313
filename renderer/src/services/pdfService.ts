import { pdfjs } from "react-pdf";
import Tesseract from "tesseract.js";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const extractText = async (file: File): Promise<string> => {
  const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
  const page = await pdf.getPage(1);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("Context colud not be got.");
  }

  const viewport = page.getViewport({ scale: 1.5 });
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;

  const opt = { logger: console.log };
  const result = await Tesseract.recognize(canvas, "eng", opt);

  return result.data.text;
};
