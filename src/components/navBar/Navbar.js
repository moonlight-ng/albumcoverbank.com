import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

// STYLES
import classes from "./Navbar.module.scss";

// IMAGE IMPORT
import Logo from "../../assets/logo.svg";
import HamburgerIcon from "../HamburgerIcon";
import MobileHamburger from "../MobileHamburger";

import { MobileCheck } from "../../utils/IsMobile";

export default function Navbar() {
  const [isShowing, setIsShowing] = useState(false);
  const [mobile, setMobile] = useState();

  function onShow() {
    setIsShowing(true);
  }
  useEffect(() => {
    const isMobile = MobileCheck();
    setMobile(isMobile);
  }, []);
  return (
    <>
      <nav className={classes.Navbar}>
        <div className={classes.Logo}>
          <Link to="/">
            <img src={Logo} alt="cover bank logo" />
          </Link>
        </div>

        <ul>
          {!mobile ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : `${classes.inactive}`
                  }
                  to="/"
                >
                  Covers
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : `${classes.inactive}`
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <a
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : `${classes.inactive}`
                  }
                  href="https://airtable.com/appHk58J4aUulwANn/shrZfNfuUyNeGaepQ"
                  target="_blank"
                >
                  Submit
                </a>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <HamburgerIcon onShow={onShow} />
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* DROPDOWN */}
      {isShowing && <MobileHamburger setIsShowing={setIsShowing} />}
    </>
  );
}
