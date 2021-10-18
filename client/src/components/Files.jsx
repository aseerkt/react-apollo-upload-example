import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_PHOTOS_QUERY = gql`
  query GetPhotos {
    getPhotos
  }
`;

function Files() {
  const { data, loading, error } = useQuery(GET_PHOTOS_QUERY);

  if (loading) return <h1>loading files...</h1>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.getPhotos?.map((f, i) => (
        <div key={f}>
          <a href={f} target='_blank' rel='noreferrer'>
            File #{i + 1}
          </a>
        </div>
      ))}
      {!data?.getPhotos.length && <p>No files uploaded yet</p>}
    </div>
  );
}

export default Files;
