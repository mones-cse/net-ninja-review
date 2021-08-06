import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Homepage from "./pages/Homepage";
import Category from "./pages/Category";
import ReviewDetails from "./pages/ReviewDetails";
import SideHeader from "./components/SideHeader";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <div className="App">
      <Router>
        <ApolloProvider client={client}>
          <SideHeader />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/details/:id">
              <ReviewDetails />
            </Route>
            <Route path="/category/:id">
              <Category />
            </Route>
          </Switch>
        </ApolloProvider>
      </Router>
    </div>
  );
}

export default App;

//todo
// watch from here
// https://youtu.be/Y5iDq-suzCA?list=PL4cUxeGkcC9h6OY8_8Oq6JerWqsKdAPxn&t=70
