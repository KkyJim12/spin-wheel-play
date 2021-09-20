import MainLayout from 'layouts/MainLayout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/:id' exact>
            <MainLayout />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
