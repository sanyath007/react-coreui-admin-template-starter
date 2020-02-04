import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Signin = React.lazy(() => import('./views/Pages/Signin/Signin'));
const Signup = React.lazy(() => import('./views/Pages/Signup/Signup'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { isAuthenticated } = this.props;

    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/signin" name="Sign In Page" render={props => <Signin {...props}/> } />
              <Route exact path="/signup" name="Sign Up Page" render={props => <Signup {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => 
                isAuthenticated
                  ? <DefaultLayout {...props}/>
                  : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
              } />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(App);
