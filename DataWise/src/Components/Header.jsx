import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import DataWiseLogo from '/DataWiseLogo.png';
import { navItems } from "../utils/constants";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-8 py-4 bg-gradient-to-b from-black to-gray-900 z-10 flex flex-col md:flex-row justify-between items-center shadow-lg">
      <img className="w-44 mx-auto md:mx-0 hover:opacity-90 transition-opacity duration-300"  />

      <nav className="flex space-x-8 mt-4 md:mt-0">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className="text-white font-semibold hover:text-gray-300 transition-colors duration-300"
          >
            {item.name}
          </button>
        ))}
      </nav>

      {user && (
        <div className="flex items-center space-x-4 p-2">
          <FaRegUser className="text-white w-8 h-8 md:w-12 md:h-12 hover:text-gray-400 transition-colors duration-300 cursor-pointer" />
          <button
            onClick={handleSignOut}
            className="font-bold text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
