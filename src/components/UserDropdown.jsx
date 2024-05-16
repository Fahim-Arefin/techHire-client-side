import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserDropdown = () => {
  const { user, logOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleDropdown = (event) => {
    event.stopPropagation(); // Stop event propagation to avoid immediate closure
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log("Logged out");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className="absolute right-0 min-w-48 mt-2 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none "
    >
      <div className="py-1 divide-y divide-gray-200">
        <a
          href="#"
          className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#f87060] hover:text-white"
        >
          {user?.email}
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-xs text-gray-500 hover:bg-[#f87060] hover:text-white"
          onClick={handleLogOut}
        >
          Logout
        </a>
      </div>
    </div>
  );

  return (
    <div className="inline-block relative">
      <button
        type="button"
        onClick={handleDropdown}
        className="focus:outline-none hover:ring-2 hover:ring-[#f87060] rounded-full p-0.5"
      >
        <img
          // src={currentUser?.img}
          src={`${user?.photoURL}`}
          alt="User Avatar"
          className="w-9 h-9 rounded-full"
        />
      </button>
      {isOpen && dropdownContent}
    </div>
  );
};

export default UserDropdown;
