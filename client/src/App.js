import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store";

import AdminDashboard from "./components/dashboard/AdminDashboard";
import CreateUser from "./components/auth/CreateUser";
import Login from "./components/auth/Login";
import Reset from "./components/auth/Reset";
import Newpassword from "./components/auth/Newpassword";

import ClientDashboard from "./components/dashboard/ClientDashboard";
import TicketPage from "./components/ticket/TicketPage";
import PrivateRoute from "./components/routing/PrivateRoute";
import UserPage from "./components/user/UserPage";
import CreateTicket from "./components/ticket/CreateTicket";
import EditProfile from "./components/editprofile/EditProfile";
import TicketConversation from "./components/ticket-conversation/TicketConversation";

import "./App.css";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/reset' component={Reset} />
            <Route exact path='/reset/:token' component={Newpassword} />

            <PrivateRoute path='/admin-dashboard' component={AdminDashboard} />
            <PrivateRoute exact path='/ticket' component={TicketPage} />
            <PrivateRoute
              exact
              path='/ticket/:id'
              component={TicketConversation}
            />
            <PrivateRoute
              path='/client-dashboard'
              component={ClientDashboard}
            />
            <PrivateRoute exact path='/user-page' component={UserPage} />
            <PrivateRoute path='/create-user' component={CreateUser} />
            <PrivateRoute path='/create-ticket' component={CreateTicket} />
            <PrivateRoute path='/edit-profile' component={EditProfile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
