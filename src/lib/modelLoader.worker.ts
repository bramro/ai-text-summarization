import { env, pipeline, SummarizationPipeline } from '@Xenova/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

interface Progress {
  name: string,       // Xenova/distilbart-cnn-6-6
  file: string,       // onnx/decoder_model_merged_quantized.onnx
  loaded: number,     // bytes
  progress: number,   // %
  total: number,      // bytes
}

let summarizer: SummarizationPipeline | null = null;

const init = async (model: string) => {
  if (summarizer) {
    return summarizer;
  }
  summarizer = await pipeline('summarization', model, {
    progress_callback: (progress: Progress) => {
      console.log("Model loading:", progress);
    }
  });
  return summarizer;
};

onmessage = async (event: MessageEvent<{ model: string, text?: string }>) => {
  try {
    const model = event.data.model;
    const summarizer = await init(model);

    if (event.data.text) {

      const startTime = performance.now();
      postMessage({ status: 'summarizing' });

      const result: any = await summarizer(event.data.text, {
        min_length: 70,
        max_length: 150,
      });

      const endTime = performance.now();
      console.log(`Summarization took ${endTime - startTime} milliseconds`);

      postMessage({ status: 'summarized', summary: result[0].summary_text?.trim() });
    } else {
      postMessage({ status: 'loaded' });
    }
  } catch (error) {
    postMessage({ status: 'error', error: error })
  }
};