import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_FILES_QUERY = gql`
  query GetFiles {
    getFiles
  }
`;

function Files() {
  const { data, loading, error } = useQuery(GET_FILES_QUERY);

  if (loading) return <h1>loading files...</h1>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.getFiles?.map((f, i) => (
        <div key={f}>
          <a href={f} target='_blank' rel='noreferrer'>
            File #{i + 1}
          </a>
        </div>
      ))}
      {!data?.getFiles.length && <p>No files uploaded yet</p>}
    </div>
  );
}

export default Files;
