import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          categoryname
          posts {
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
      }
    }
  }
`;

const Category = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div>
      <h3 className='category-title'>
        {data.category.data.attributes.categoryname}
      </h3>
      <div className='grid-container'>
        {data.category.data.attributes.posts.data.map((post) => (
          <div key={post.id} className='post-card'>
            <h2>{post.attributes.postTitle}</h2>

            <div className='date-category'>
              <small>
                {format(
                  new Date(post.attributes.datetime),
                  'dd MMM yyyy hh:mm'
                )}
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
    </div>
  );
};

export default Category;
