import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface DesignUploadProps {
  onUpload: (files: File[]) => void;
}

const DesignUpload: React.FC<DesignUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [hasDesigns, setHasDesigns] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files);
      setFiles(fileList);
    }
  };

  const handleUpload = () => {
    onUpload(files);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Your Designs</h2>
      {hasDesigns === null ? (
        <div className="mb-4">
          <p className="mb-2">Do you have design files ready?</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setHasDesigns(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Yes
            </button>
            <button
              onClick={() => setHasDesigns(false)}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              No
            </button>
          </div>
        </div>
      ) : hasDesigns ? (
        <>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your design files here, or click to select files
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
          </div>
          {files.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
              <ul className="list-disc pl-5">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload and Continue
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-4">No problem! You can create designs using our built-in tools.</p>
          <button
            onClick={() => setHasDesigns(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Designing
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignUpload;