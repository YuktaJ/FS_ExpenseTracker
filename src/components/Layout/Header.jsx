import { IoHomeOutline } from "react-icons/io5";
import { GrLogin } from "react-icons/gr";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { RxDashboard } from "react-icons/rx";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";

function Header() {
  const { isLoggedIn, logOut, isPremium } = useContext(AuthContext);
  console.log(isLoggedIn, isPremium, "dekhoooo");
  return (
    <header>
      <div className="px-3 py-2 text-bg-dark border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlink:href="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <NavLink to="/home" className="nav-link text-secondary">
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <IoHomeOutline style={{ fontSize: "25px" }}></IoHomeOutline>
                  </svg>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/expenses" className="nav-link text-white">
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <RxDashboard style={{ fontSize: "25px" }}></RxDashboard>
                  </svg>
                  Expense
                </NavLink>
              </li>
              <li>
                {isPremium == false && isLoggedIn == true && (
                  <NavLink to="/premium" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <BiSolidBadgeCheck
                        style={{ fontSize: "25px", color: "goldenrod" }}
                      ></BiSolidBadgeCheck>
                    </svg>
                    Premium
                  </NavLink>
                )}
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <MdOutlineLeaderboard
                      style={{ fontSize: "25px", color: "green" }}
                    />
                  </svg>
                  Leader Board
                </a>
              </li>
              {!isLoggedIn && (
                <li>
                  <NavLink to="/auth/login" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <GrLogin
                        style={{ fontSize: "25px", color: "green" }}
                      ></GrLogin>
                    </svg>
                    LogIn
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li onClick={() => logOut()}>
                  <NavLink to="/home" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <GrLogin
                        style={{ fontSize: "25px", color: "red" }}
                      ></GrLogin>
                    </svg>
                    LogOut
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
