import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md sticky flex justify-between top-0 z-999 w-full items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-400">TechTrek</div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center  ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-purple-300 font-semibold" : "hover:text-purple-300"
          }
        >
          Home
        </NavLink>

        {!isLoggedIn && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-purple-300 font-semibold" : "hover:text-purple-300"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "text-purple-300 font-semibold" : "hover:text-purple-300"
              }
            >
              Signup
            </NavLink>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                isActive ? "text-purple-300 font-semibold" : "hover:text-purple-300"
              }
            >
              Quiz
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive ? "text-purple-300 font-semibold" : "hover:text-purple-300"
              }
            >
              Notes
            </NavLink>
            <button className="cursor-pointer hover:text-purple-300"           >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
