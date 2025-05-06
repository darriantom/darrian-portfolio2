"use client";

export default function ResumePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full h-full bg-white rounded-lg shadow-lg">
        <iframe
          src="/resume.pdf"
          className="w-full h-[90vh]"
          title="Resume PDF"
        />
      </div>
    </div>
  );
} 