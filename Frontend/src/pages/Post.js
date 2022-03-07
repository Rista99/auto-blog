import React from 'react';
import { useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';
import { format } from 'date-fns';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      data {
        id
        attributes {
          postTitle
          postContent
          datetime
          postMedia {
            data {
              attributes {
                name
                alternativeText
              }
            }
          }
          categories {
            data {
              id
              attributes {
                categoryname
              }
            }
          }
        }
      }
    }
  }
`;

const Post = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(POST, { variables: { id: id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
  return (
    <div className='single-post'>
      <h2>{data.post.data.attributes.postTitle}</h2>
      <div className='date-category'>
        <small>
          {format(
            new Date(data.post.data.attributes.datetime),
            'dd MMM yyyy HH:mm '
          )}
        </small>
        <small>-</small>

        {data.post.data.attributes.categories.data.map((c) => (
          <small key={c.id}>{c.attributes.categoryname}</small>
        ))}

        <img
          src={data.post.data.attributes.postMedia.data.attributes.name}
          alt={data.post.data.id}
        />
      </div>
      <ReactMarkdown>{data.post.data.attributes.postContent}</ReactMarkdown>
    </div>
  );
};

export default Post;
