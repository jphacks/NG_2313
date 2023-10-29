import React, { useEffect, useState } from "react";

import { FaFilePdf } from "react-icons/fa";
import type { Document } from "../../src/types/document";

const Documents: React.FunctionComponent = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    void (async () => {
      const docs = await window.ipc.loadFiles();
      setDocuments(docs);
    })();
  }, []);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files === null || event.target.files.length < 1) return;

    const files: File[] = [];

    const filenames = documents.map((v) => v.name);
    const uploadedFiles = event.target.files;
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles.item(i);
      if (file === null || filenames.includes(file.name)) continue;

      filenames.push(file.name);
      files.push(file);
    }

    void (async () => {
      const docs = await window.ipc.saveFiles(files);
      await window.ipc.pdf(docs);
      setDocuments((prev) => [...prev, ...docs]);
    })();
  };

  const maxFileNameLen = 40;
  const fmtFileName = (name: string): string => {
    return name.length < maxFileNameLen
      ? name
      : `${name.substring(0, maxFileNameLen)}...`;
  };

  return (
    <React.Fragment>
      <div className="mx-auto">
        <input
          id="pdf"
          className="hover:file:bg-primary-700 file:bold block w-full text-sm file:mr-2 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2.5 file:text-sm file:text-white focus:outline-none"
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          multiple
        />
      </div>
      <div className="my-4 w-full text-lg">
        {documents.map((d) => (
          <button
            key={d.name}
            className="mt-1 block w-full rounded-md p-1 hover:bg-gray-500"
          >
            <div className="flex items-center">
              <FaFilePdf size={20} />
              <p className="mx-1 max-w-full overflow-hidden whitespace-nowrap">
                {d.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Documents;
