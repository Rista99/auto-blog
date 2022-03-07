import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { format } from 'date-fns';

import Post from './Post';
import { Link } from 'react-router-dom';

const POSTS = gql`
  query GetPosts {
    posts(sort: "datetime:desc") {
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

const Homepage = () => {
  const { loading, error, data } = useQuery(POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
  return (
    <div className='grid-container'>
      {data.posts.data.map((post) => (
        <div key={post.id} className='post-card'>
          <h2>{post.attributes.postTitle}</h2>

          <div className='date-category'>
            <small>
              {format(new Date(post.attributes.datetime), 'dd MMM yyyy HH:mm ')}
            </small>
            <small>-</small>
            {post.attributes.categories.data.map((c) => (
              <small key={c.id}>{c.attributes.categoryname}</small>
            ))}
          </div>

          <img
            src={post.attributes.postMedia.data.attributes.name}
            alt={post.id}
          />

          <p>{post.attributes.postContent.substring(0, 200)}...</p>

          <Link to={`/posts/${post.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
