import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?worker';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

// import workerSrc from 'pdfjs-dist/build/pdf.worker?worker&url'
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

export const extractTextFromPDF = async (file: File | null): Promise<string[]> => {
  if (!file) {
    return [];
  }
  try {
    const fileArrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument(fileArrayBuffer).promise;
    let fullText = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter(item => 'str' in item)
        .map(item => (item as TextItem).str)
        .join(' ');
      fullText.push(pageText);
    }
    return fullText;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return ["Error parsing PDF"];
  }
};