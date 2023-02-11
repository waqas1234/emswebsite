import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "shared/routes/index";
import { logout } from "shared/store/slices/authentication/userSlice";

export default function UserValidator({ element: MyComponent }) {
  const [component, setComponent] = useState(<></>);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      navigate(AppRoutes.login.path);
    }
    if (token) {
      setComponent(<MyComponent />);
    } else {
      navigate(AppRoutes.login.path);
    }

    if (!isAuthenticated) {
      navigate(AppRoutes.login.path);
    } else {
      setComponent(<MyComponent />);
    }
  }, [isAuthenticated, navigate, token, dispatch]);

  return component;
}
