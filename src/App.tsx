import { useState } from 'react';
import './app.css';
import FileSummary from './FileSummary';
import FileUpload from './FileUpload';
import Navbar from './Navbar';

function App() {
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