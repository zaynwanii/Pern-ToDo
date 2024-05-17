import { Fragment } from "react";


// Components:
import Input from "./Input";
import List from "./List";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Input />
        <List />
      </div>
    </Fragment>
  );
}

export default App;
