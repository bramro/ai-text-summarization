import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractTextFromPDF } from '@/lib/pdfUtils';

interface Props {
  file: File | null;
}

function FileSummary(props: Props) {
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    const fetchSummary = async () => {
      const extractedText = await extractTextFromPDF(props.file);
      setSummary(extractedText);
    };

    fetchSummary();
  }, [props.file]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="p-4 bg-gray-100 rounded-md overflow-auto">
          <code className="whitespace-pre-wrap break-words">{summary}</code>
        </pre>
      </CardContent>
    </Card>
  );
}

export default FileSummary;