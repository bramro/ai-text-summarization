import { env, pipeline, SummarizationPipeline } from '@Xenova/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

let summarizer: SummarizationPipeline | null = null;

const init = async (model: string) => {
  if (summarizer) {
    return summarizer;
  }
  summarizer = await pipeline('summarization', model);
  return summarizer;
};

onmessage = async (event: MessageEvent<{ model: string, text?: string }>) => {
  try {
    const model = event.data.model;
    const summarizer = await init(model);

    if (event.data.text) {

      postMessage({ status: 'summarizing' });

      const result: any = await summarizer(event.data.text, {
        min_length: 50,
        max_length: 100,
      });

      postMessage({ status: 'summarized', summary: result[0].summary_text?.trim() });
    } else {
      postMessage({ status: 'loaded' });
    }
  } catch (error) {
    postMessage({ status: 'error', error: error })
  }
};