import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
