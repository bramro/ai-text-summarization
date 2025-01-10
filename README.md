# ai-text-summarization

Demo React/Tailwind app with AI text-summarization capabilities. This application uses a browser-based machine learning model to summarize English text, read from a PDF.

## Features

- Text summarization using a small DistilBART model
- Text extraction from PFD using pdfjs
- Modern UI built with Tailwind CSS and Shadcn/ui
- Fully client-side processing - no server required

## Technologies

- React 18
- TypeScript
- Tailwind CSS 
- Shadcn/ui
- Hugging Face Transformers.js

## Installation

First, install all dependencies:

```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

This will start the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

This will create an optimized build in the build folder.

## Important Notes

- The ML model is downloaded when first visiting the page, which may take some time.
- The summarization model is running in your browser, which can take up to a minute to complete, depending on the size of the PDF.
- All processing happens locally in the browser - no files are sent to external servers.