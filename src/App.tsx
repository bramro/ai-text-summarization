import { useState } from 'react';
import './app.css';
import FileInformation from './FileInformation';
import FileSummary from './FileSummary';
import FileUpload from './FileUpload';

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-2/5 min-w-96 max-w-xl space-y-4">
        <FileUpload onUploadComplete={setUploadedFile} />
        <FileInformation file={uploadedFile} />
        <FileSummary file={uploadedFile} />
      </div>
    </div>
  );
}

export default App;