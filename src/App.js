import MainLayout from 'layouts/MainLayout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/init' />
          </Route>
          <Route path='/:id' exact>
            <MainLayout />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
