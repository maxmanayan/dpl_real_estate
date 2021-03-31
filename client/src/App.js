import './App.css';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import About from './pages/About';
import ComponentDemo from './pages/ComponentDemo';
import NoMatch from './components/NoMatch';
import Register from './pages/Register';
import Login from './pages/Login';
import Available from './pages/Available';
import Cities from './pages/Cities';

function App() {
  return (
    <div className='demo'>
      <NavBar/>
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/about' component={About} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/componentDemo' component={ComponentDemo} /> */}
          <Route exact path='/available' component={Available} />
          <Route exact path='/cities' component={Cities} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
      </div>
  );
}

export default App;
