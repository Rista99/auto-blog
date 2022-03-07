import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// Page import
import Homepage from './pages/Homepage';
import Post from './pages/Post';
import Category from './pages/Category';
import Header from './components/Header';

// apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage />} />

            <Route path='/posts/:id' element={<Post />} />

            <Route path='/category/:id' element={<Category />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
};

export default App;
