import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Student from "./screens/student/Student";
import Insertion from "./screens/insertion/Insertion";
import Volunteer from "./screens/volunteer/Volunteer";
import Act from "./screens/act/Act";
import Admin from "./screens/admin/Admin";
import Discover from "./screens/discover/Discover";
import Blog from "./screens/blog/Blog";
import ArticleScreen from './screens/blog/ArticleScreen';
import theme from "./components/Theme";
import { ThemeProvider } from "@mui/material";

// Le store où on va stocker le token de l'admin
import admin from "./reducers/admin.reducer";
import article from "./reducers/article.reducer";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(combineReducers({ admin, article }));

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Discover} />
            <Route path="/espace-eleve" component={Student} />
            <Route path="/espace-insertion" component={Insertion} />
            <Route path="/espace-benevole" component={Volunteer} />
            <Route path="/blog" component={Blog} />
            <Route path="/article" component={ArticleScreen} />
            <Route path="/j-agis" component={Act} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>

  );
}

export default App;