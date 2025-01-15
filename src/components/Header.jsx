import React, { useState, useEffect } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { AiFillBell } from "react-icons/ai";

const Header = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const img =
    currentUser?.nodeCategory === 1
      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nUV3e0reIUuZYcqKszuM3VTqPpLzaQfhkw&s"
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5WV7VpA7O5nDNXRiO9WhuwwGvVHwTc5Nww&s";

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleBellClick = () => {
    setHasNotifications(false); // Mark notifications as seen
    // Add any additional logic for bell click here
  };

  return (
    <div className="py-7">
      <Navbar className="border-b-2 h-24 mb-10 fixed w-full z-20 top-0 start-0 flex justify-center items-center dark:bg-black">
        <div className="flex justify-center items-center w-full max-w-screen-xl px-4">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
          >
            <span className="mr-16 px-3 md:m py-2 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 rounded-lg text-white font-bold">
              PSSKVP
            </span>
          </Link>

          <TextInput
            className="hidden lg:block w-80 border-2 dark:border-gray-500 mr-8 ml-16"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex space-x-4">
          <Link to="/importantlinks">
  <span className="px-3 md:m py-2 bg-gradient-to-r from-green-600 to-blue-900 rounded-lg text-white font-bold">
    Important Links
  </span>
</Link>
<Link to="/gallery">
  <span className="px-3 md:m py-2 bg-gradient-to-r from-green-600 to-blue-900 rounded-lg text-white font-bold">
    Gallery
  </span>
</Link>
<Link to="/member">
  <span className="px-3 md:m py-2 bg-gradient-to-r from-green-600 to-blue-900 rounded-lg text-white font-bold">
    Member
  </span>
</Link>
<Link to="/aboutus">
  <span className="px-3 md:m py-2 bg-gradient-to-r from-green-600 to-blue-900 rounded-lg text-white font-bold">
    About Us
  </span>
</Link>
<Link to="/contactus">
  <span className="px-3 md:m py-2 bg-gradient-to-r from-green-600 to-blue-900 rounded-lg text-white font-bold">
    Contact Us
  </span>
</Link>

            <Link to="/notification">
                        <AiFillBell
                          onClick={handleBellClick}
                          className={`text-3xl cursor-pointer ${
                            hasNotifications
                              ? "text-red-800 animate-bounce"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        />
                      </Link>
          </div>

        </div>
      </Navbar>
    </div>
  );
};

export default Header;
