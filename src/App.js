
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component.js";
import ImagePart from './ImagePart';
import TokenService from './services/token-service';
import IdleService from './services/idle-service';
import AuthApiService from './services/auth-api-service';
import HeaderHooks from './HeaderHooks/HeaderHooks';
import LoginHooks from './LoginHooks/LoginHooks';
import PublicOnlyRoute from './Route/PublicOnlyRoute';
import PrivateRoute from './Route/PrivateRoute';

class App extends Component {
  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      // this.forceUpdate()
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    console.log("logout idle");
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
    // this.props.history.push('/');
  }
  render() {
    return (
      <Router>
      <div className="container">
         {/* <Navbar /> */}
         <HeaderHooks />
         <br/>
         <Switch>
         <PublicOnlyRoute exact path="/" component={LoginHooks} />
         <PrivateRoute exact path="/exercise" component={ExercisesList} />
         <PrivateRoute path="/edit/:id" component={EditExercise} />
         <PrivateRoute path="/create" component={CreateExercise} />
         <Route path="/user" component={CreateUser} />
         <Route component={NotFoundPage} />
         </Switch>
         {/* <Route path="/exercise" exact component={ExercisesList} />
         <Route path="/edit/:id" component={EditExercise} /> */}

         {/* <Route path="/create" component={CreateExercise} /> */}
         {/* <Route path="/user" component={CreateUser} /> */}
       </div>
       {/* <ImagePart /> */}
    </Router>
    );
  }
}

function NotFoundPage() {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/exercise">Go Back</Link>
    </>

  )
}

export default App;
