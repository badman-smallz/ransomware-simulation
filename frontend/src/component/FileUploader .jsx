import { useState } from "react";

const FileUploader = ({ onFilesSelected }) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFilesSelected(selectedFiles);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
