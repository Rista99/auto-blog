import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          categoryname
        }
      }
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Can't fetch categories</p>;

  return (
    <div className='header'>
      <Link to='/'>
        <h1>Autoblog</h1>
      </Link>
      <nav className='categories'>
        {data.categories.data.map((c) => (
          <Link key={c.id} to={`/category/${c.id}`}>
            {c.attributes.categoryname}
          </Link>
        ))}
        |
      </nav>
    </div>
  );
};

export default Header;
