import { FaGithub } from 'react-icons/fa';

function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-gray-900 text-white pl-10">

      <div className="container flex items-center justify-between h-20">

        <div className="flex flex-col items-start">
          <span className="font-bold text-xl">Summarization</span>
          <span className="text-xs">Demo app made with React, Shadcn/ui and Hugging Face Transformers.js</span>
        </div>

        <a href="https://github.com/bramro/ai-text-summarization" target="_blank" rel="noopener noreferrer">
          <FaGithub className="h-8 w-8 text-white" />
        </a>

      </div>
    </div>
  );
}

export default Navbar;