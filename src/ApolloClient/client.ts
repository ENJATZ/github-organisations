import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const DEFAULT_ENDPOINT = "https://api.github.com/graphql";
const API_KEY = "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";

const httpLink = createHttpLink({
  uri: DEFAULT_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // expunem API KEY la client - e necesar un BE ca si middleware
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${API_KEY}`,
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
