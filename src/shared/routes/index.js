import { Routes, Route } from "react-router-dom";
import Login from "screens/Authentication/Login";
import Register from "screens/Authentication/Register";
import Companies from "screens/Companies";
import Events from "screens/Events";
import AddEvent from "screens/Events/AddEvent";
import EditEvent from "screens/Events/EditEvent";
import Home from "screens/Home";
import Notification from "screens/Notification/index";
import Profile from "screens/Profile";
import UserValidator from "shared/components/authentication/UserValidator";

export const AppRoutes = {
  dahsboard: {
    path: "/",
    component: Home,
    isAuth: true,
  },
  login: { path: "/login", component: Login },
  register: { path: "/register", component: Register },
  events: {
    path: "/events",
    component: Events,
    isAuth: true,
  },
  addevent: {
    path: "/add-event",
    component: AddEvent,
    isAuth: true,
  },
  profile: {
    path: "/my-profile",
    component: Profile,
    isAuth: true,
  },
  companies: {
    path: "/companies",
    component: Companies,
    isAuth: true,
  },

  editevent: {
    path: "/edit-event/:id",
    component: EditEvent,
    isAuth: true,
  },

  notifications: {
    path: "/notifications",
    component: Notification,
    isAuth: true,
  },
};

const WebRoutes = () => {
  return (
    <Routes>
      {Object.keys(AppRoutes).map((route, index) => {
        const { path, component: Component, isAuth } = AppRoutes[route];
        return (
          <Route
            key={`app-routes-${index}`}
            path={path}
            element={
              isAuth ? <UserValidator element={Component} /> : <Component />
            }
          />
        );
      })}
    </Routes>
  );
};

export default WebRoutes;
