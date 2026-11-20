'use client';

import { Download } from 'lucide-react';

const RESUME_PDF_PATH = '/images/resume/Sofia_Hernandes_Resume.pdf';
const RESUME_FILE_NAME = 'Sofia_Hernandes_Resume.pdf';

export default function Resume() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2">
        <span className="truncate text-xs font-medium text-gray-600">
          {RESUME_FILE_NAME}
        </span>
        <a
          href={RESUME_PDF_PATH}
          download={RESUME_FILE_NAME}
          className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download PDF</span>
        </a>
      </div>

      <div className="relative flex-1 overflow-hidden bg-gray-100">
        <iframe
          src={`${RESUME_PDF_PATH}#toolbar=0&navpanes=0&view=FitH`}
          title="Sofia Botechia Hernandes Resume"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
