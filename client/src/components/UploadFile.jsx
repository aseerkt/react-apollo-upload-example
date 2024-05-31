import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_FILES_QUERY } from "./Files";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

function UploadFile() {
  const [file, setFile] = useState(null);
  const [uploadRequest, { loading, error }] = useMutation(
    SINGLE_UPLOAD_MUTATION
  );

  const uploadFile = async () => {
    if (!file) return;
    try {
      const res = await uploadRequest({
        variables: { file },
        refetchQueries: [{ query: GET_FILES_QUERY }],
      });
      if (res.data) {
        setFile(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        className="App-input"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload</button>
      <p>{loading && "Uploading..."}</p>
      <p>{error?.message}</p>
    </div>
  );
}

export default UploadFile;
