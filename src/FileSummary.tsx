import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from '@/components/expansions/spinner';
import { extractTextFromPDF } from '@/lib/pdfUtils';
import { env, pipeline, SummarizationPipeline } from '@Xenova/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

interface Props {
  file: File | null;
}

function FileSummary(props: Props) {
  const [isSummarizerLoaded, setIsSummarizerLoaded] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const summarizer = useRef<SummarizationPipeline | null>(null);
  const model = "Xenova/distilbart-cnn-6-6";

  useEffect(() => {
    const init = async () => {
      if (summarizer.current) return;
      summarizer.current = await pipeline('summarization', model);
      setIsSummarizerLoaded(true);
    };
    init();
  }, []);

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
        {!isSummarizerLoaded &&
          <Spinner size="medium">Loading {model}...</Spinner>
        }
        {isSummarizerLoaded && summary &&
          <pre className="p-4 bg-gray-100 rounded-md overflow-auto">
            <code className="whitespace-pre-wrap break-words">{summary}</code>
          </pre>
        }
      </CardContent>
    </Card>
  );
}

export default FileSummary;