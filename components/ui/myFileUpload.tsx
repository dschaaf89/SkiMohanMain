import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface MyFileUploadProps {
  onFilesUploaded: (acceptedFiles: File[]) => void; // Define the prop type here
}

const MyFileUpload: React.FC<MyFileUploadProps> = ({ onFilesUploaded }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      onFilesUploaded(acceptedFiles); // Call the passed function with the files
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], // Accept .docx files
    },
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export { MyFileUpload };
