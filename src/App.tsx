import { useState, useEffect } from 'react';
import './app.css';
import FileSummary from './FileSummary';
import FileUpload from './FileUpload';
import Navbar from './Navbar';

function App() {

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const gaId = import.meta.env.VITE_GA_ID;
      // Dynamically load the Google Analytics script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", gaId as string);
    }
  }, []);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar />
      <div className="flex justify-center items-start flex-grow">
        <div className="min-w-96 max-w-xl space-y-4 mt-10 mb-10">
          <FileUpload onUploadComplete={setUploadedFile} />
          <FileSummary file={uploadedFile} />
        </div>
      </div>
    </div>
  );
}

export default App;