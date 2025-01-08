import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      setUploadProgress(10); // Initial progress

      // Simulate upload progress with setTimeout
      let progress = 10;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadProgress(progress);
        } else {
          props.onUploadComplete(file);
          clearInterval(interval);
        }
      }, 150) // Adjust this number to change the delay

    } else {
      setUploadProgress(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">Upload PDF</CardTitle>
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
      </CardContent>
    </Card>
  );
}

export default FileUpload;