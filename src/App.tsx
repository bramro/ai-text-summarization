import { useState } from 'react';
import './app.css';
import FileSummary from './FileSummary';
import FileUpload from './FileUpload';

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-200">
      <div className="min-w-96 max-w-xl space-y-4 mt-20">
        <FileUpload onUploadComplete={setUploadedFile} />
        <FileSummary file={uploadedFile} />
      </div>
    </div>
  );
}

export default App;