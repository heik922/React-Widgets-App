import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  // use to toggle if dropdown is open / close
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // with Event Bubbling up, we listen when user click outside of the dropdown it will close the list also
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    // turn off the eventlisenter if the dropdown element is not on screen
    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderOption = options.map((option) => {
    // when user selected "red", "red" doesnt shows up again on dropdown list
    if (option.value === selected.value) return null;

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderOption}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
