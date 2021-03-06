import React, { useState } from "react";

const Accordion = ({ items }) => {
  // array destructuring of useState
  // null is initial value, can be: 0 , null , ''
  // second element we get from useState is always a setter
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    // will cause our component to auto rerender when we update ...
    setActiveIndex(index);
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      <React.Fragment key={item.title}>
        <div
          className={`title ${active}`}
          onClick={() => {
            onTitleClick(index);
          }}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
