import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
// create the connection to the API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
// setContext() function will set the HTTP request headers of every request to include the token, whether the request needs it or not.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// instantiate the Apollo Client instance and create the connection to the API endpoint.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// wrap the entire <App /> with the <ApolloProvider> component imported from @apollo/client.
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar/>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
