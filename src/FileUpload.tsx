import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Props {
  onUploadComplete: (file: File) => void;
}

function FileUpload(props: Props) {

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadProgress(10);
      simulateUpload(file);
    } else {
      setUploadProgress(0);
    }
  };

  const handleLinkClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setUploadProgress(10);
    const pdfUrl = event.currentTarget.href;
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const file = new File([blob], pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1), { type: 'application/pdf' });

      simulateUpload(file);

    } catch (error) {
      console.error("Error fetching PDF", error);
    }
  }

  const simulateUpload = (file: File) => {
    let progress = 10;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setUploadProgress(progress);
      } else {
        props.onUploadComplete(file);
        clearInterval(interval);
      }
    }, 50) // Adjust this number to change the delay
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">Select PDF</CardTitle>
        <CardDescription className="text-xs text-gray-500">Files wil not be sent to the server. Extrating the text and making the summary is done in your browser.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center border-2 border-dashed rounded-md p-10 border-gray-300 hover:border-gray-400 cursor-pointer">
            <Input type="file" accept=".pdf" className="hidden" id="file-input" onChange={handleFileChange} />
            <label htmlFor="file-input" className="text-gray-500">
              <Button variant="ghost" asChild>
                <span>Select a file</span>
              </Button>
            </label>
          </div>
          {uploadProgress > 0 && uploadProgress < 100 && <Progress value={uploadProgress} />}
        </div>
        <div className="text-xs text-gray-500">
          Or use an example PDF about <a className="font-bold" href="paris.pdf" onClick={handleLinkClick}>Paris</a> (<a href="paris.pdf" target="_blank">view</a>) or <a className="font-bold" href="dinosaurs.pdf" onClick={handleLinkClick}>dinosaurs</a> (<a href="dinosaurs.pdf" target="_blank">view</a>).
        </div>
      </CardContent>
    </Card>
  );
}

export default FileUpload;