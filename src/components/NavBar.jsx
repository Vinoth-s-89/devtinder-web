import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routePaths } from "../utils/routes";

const Navbar = () => {
  const user = useSelector((store) => store.user);
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
                <Link to={routePaths.profile}>Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
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
