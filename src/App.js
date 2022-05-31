import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListPage from "./components/ListPage";
import DetailsPage from "./components/DetailsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <h2 className="text-center">Career Jobs</h2>
        <Switch>
          <Route exact path="/" component={ListPage} />
          <Route path="/details-page/:id" component={DetailsPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
