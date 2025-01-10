import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Spinner } from '@/components/expansions/spinner';
import { extractTextFromPDF } from '@/lib/pdfUtils';
import { useToast } from "@/components/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import ModelLoaderWorker from '@/lib/modelLoader.worker?worker'

interface Props {
  file: File | null;
}

function FileSummary(props: Props) {

  const { toast } = useToast();

  const [isSummarizerLoading, setIsSummarizerLoading] = useState(true);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string>("");
  
  const worker = useRef<Worker | null>(null);
  const model = "Xenova/distilbart-cnn-6-6";

  useEffect(() => {
    worker.current = new ModelLoaderWorker();
    worker.current.onmessage = (event: MessageEvent<{ status: string, summary?: string, error?: any }>) => {
      if (event.data.status === 'loaded') {
        setIsSummarizerLoading(false);
      }
      if (event.data.status === 'summarizing') {
        setIsSummarizing(true);
        setSummary("");
      }
      if (event.data.status === 'summarized') {
        setIsSummarizing(false);
        setSummary(event.data.summary || "");

        toast({
          title: "Done",
          description: "Happy reading!",
        })
      }
      if (event.data.status === 'error') {
        setIsSummarizerLoading(false);
        setSummary(event.data.error || "Error initializing worker");
      }
    };
    worker.current.postMessage({ model });

    return () => {
      if (worker.current) {
        worker.current.terminate();
      }
    };
  }, []);

  useEffect(() => {
    const fetchSummary = async () => {
      const extractedText = await extractTextFromPDF(props.file);
      if (worker.current && extractedText[0]) {
        worker.current.postMessage({ model, text: extractedText.join(" ") });
      }
    };

    fetchSummary();
  }, [props.file]);

  return (
    <>
      {props.file &&
        <Card>
          <CardHeader>
            <CardTitle className="text-left">Summary</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {props.file.name} - {props.file.size ? `${(props.file.size / 1024).toFixed(2)} KB` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSummarizerLoading &&
              <Spinner size="small">
                <span className="text-xs text-gray-500">
                  Loading {model}...
                </span>
              </Spinner>
            }
            {isSummarizing &&
              <Spinner size="small">
                <span className="text-xs text-gray-500 text-center">
                  Reading...
                  <br /><br />
                  This may take a minute, as the model is running in your browser.
                </span>
              </Spinner>
            }
            {summary &&
              <pre className="p-4 bg-gray-100 rounded-md overflow-auto">
                <code className="whitespace-pre-wrap break-words text-sm">{summary}</code>
              </pre>
            }
          </CardContent>
        </Card>
      }
    </>
  );
}

export default FileSummary;