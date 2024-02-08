import { useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import Overlay from "./Overlay";

const Nav = ({ type, putSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const inputRef = useRef();

  const handleFocus = function () {
    setIsFocused(true);
  };

  const handleBlur = function () {
    setIsFocused(false);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      putSearchTerm(value);
      inputRef.current.blur();
    }
  }

  const handleChange = function (e) {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (isFocused) document.body.style.overflow = "hidden";
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling animation
    });

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFocused]);

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={
        type === "Homepage" ? "home-page-search-bar" : "normal-search-bar"
      }
    >
      {type === "Homepage" && (
        <div className="title">
          <h2>Search, Save, and Share the Tastiest Food.</h2>
        </div>
      )}
      <div className="container">
        <div className="column1 flex">
          <img
            src={logo}
            alt="Food Khajana"
            className={type === "Homepage" ? "home-nav" : "normal-nav"}
          />
          <div className="search-input-container">
            <input
              className={`search-input ${isFocused ? "input-animate" : false}`}
              ref={inputRef}
              type="text"
              placeholder="Search Food Khajana"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
            />
          </div>
        </div>

        {/* <div className="column2 flex">
          <div className="profile">
            <img
              src={profile}
              className="profile-img"
              alt="profile image"
              width="70"
            />
          </div>
        </div> */}
      </div>
      {/* <Overlay /> */}
      {isFocused && <Overlay />}
    </div>
  );
};

export default Nav;
