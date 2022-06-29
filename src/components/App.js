import React from "react";
import Accordion from "./Accordion";
import Search from "./Search";

const items = [
  {
    title: "What is React?",
    content: "React is a front end framework",
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers",
  },
  {
    title: "How do you use React",
    content: "React .........",
  },
];

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <Accordion items={items} /> */}
        <Search />
      </div>
    );
  }
}

export default App;
