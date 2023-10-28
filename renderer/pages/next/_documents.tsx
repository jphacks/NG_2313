import React, { useEffect, useState } from "react";

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

  return (
    <React.Fragment>
      <h2 className="text-center underline">Documents</h2>
      <div className="text-xs">
        <input type="file" accept=".pdf" onChange={onFileChange} multiple />
        <div>
          {documents.map((d) => (
            <p key={d.name}>{d.name}</p>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Documents;
