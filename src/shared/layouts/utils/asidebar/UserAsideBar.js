import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "shared/store/slices/authentication/userSlice";
import { useDispatch } from "react-redux";
import socket from "shared/utils/socket";
import { useSelector } from "react-redux";

export default function UserAsideBar() {
  const [notification, setNotification] = useState(0);
  const { name, type } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([
    {
      name: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
      link: "/",
      isActive: true,
    },
    {
      name: "Companies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        </svg>
      ),
      link: "/companies",
      isActive: false,
    },
    {
      name: "Event Notifications",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      ),
      link: "/notifications",
      isActive: false,
      notification: notification,
    },
    {
      name: "My Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
      link: "/my-profile",
      isActive: false,
    },
  ]);

  console.log(type, name);
  useEffect(() => {
    socket.on("notifyUser", (data) => {
      setNotification(notification + 1);
    });
  }, [notification]);

  const handleMenuClick = (index) => {
    const updatedMenu = menu.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isActive: true,
        };
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });
    setMenu(updatedMenu);
  };

  const handlelogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between h-10 mb-4">
            <h3 className="text-sm text-white font-medium">
              Loged In as {name}
            </h3>
            <Link onClick={handlelogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                xlinkTitle="Logout"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </Link>
          </div>
          <ul className="space-y-2">
            {menu &&
              menu.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      onClick={() => handleMenuClick(index)}
                      to={item.link}
                      className={`flex relative items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        item.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                      {item.notification >= 1 && (
                        <div className="flex justify-end items-center">
                          <div className="w-4 h-4 rounded-full bg-red-600 ml-5 flex items-center justify-center">
                            <span className="text-xs text-white">
                              {item.notification}
                            </span>
                          </div>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </aside>
    </>
  );
}
