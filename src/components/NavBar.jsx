import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "../utils/routes";
import { apiPaths, appApi } from "../utils/api";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenuClick = () => {
    document.activeElement.blur();
  };

  const handleLogout = async () => {
    try {
      await appApi.post(apiPaths.logout);
      dispatch(removeUser());
      navigate(routePaths.login);
      handleMenuClick();
    } catch (error) {}
  };
  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <Link to={routePaths.home} className="btn btn-ghost text-xl">
          🧑‍💻DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-3 mx-3 items-center">
          <h2>Welcome, {user?.firstName}</h2>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profileUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={routePaths.profile} onClick={handleMenuClick}>
                  Profile
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
