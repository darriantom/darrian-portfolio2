'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import Heading from "@/components/Heading";
import FramerWrapper from "@/components/animation/FramerWrapper";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ResumePage() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <FileText className="h-4 w-4" />
        Resume
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Resume</Heading>
        <FramerWrapper y={0} x={200}>
          <p className="font-poppins text-lg w-full text-primary max-sm:text-base">
            Here you can view and download my professional resume.
          </p>
        </FramerWrapper>
      </div>

      <div className="w-full flex flex-col items-center">
        <FramerWrapper y={100} delay={0.3} className="w-full max-w-4xl">
          <div className="w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-4">
            <Document
              file="/resume.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center"
              loading={
                <div className="flex justify-center items-center h-[500px]">
                  <p className="text-lg font-poppins">Loading resume...</p>
                </div>
              }
              error={
                <div className="flex justify-center items-center h-[500px]">
                  <p className="text-lg font-poppins text-red-500">
                    Failed to load resume. Please make sure the file exists at /resume.pdf
                  </p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="max-w-full"
                scale={1.2}
              />
            </Document>
            {numPages && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                  disabled={pageNumber <= 1}
                  className="px-4 py-2 bg-purple-300 text-white rounded disabled:bg-gray-300 hover:bg-purple-400 transition-colors"
                >
                  Previous
                </button>
                <p className="text-gray-600 dark:text-gray-300 font-poppins">
                  Page {pageNumber} of {numPages}
                </p>
                <button
                  onClick={() => setPageNumber(page => Math.min(page + 1, numPages))}
                  disabled={pageNumber >= numPages}
                  className="px-4 py-2 bg-purple-300 text-white rounded disabled:bg-gray-300 hover:bg-purple-400 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </FramerWrapper>
      </div>
    </div>
  );
} 