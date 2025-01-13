import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import FileSummary from './FileSummary';
import FileUpload from './FileUpload';
import Navbar from './Navbar';
import './App.css';

function App() {

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const gaId = import.meta.env.VITE_GA_ID;
      ReactGA.initialize(gaId);
      console.info("Google Analytics initialized");
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