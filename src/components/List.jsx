import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import Edit from "./Edit";

export default function List() {
  const [todoItems, setTodoItems] = useState([]);
  const [editTrigger,setEditTrigger]=useState(false);

  useEffect(() => {
    getItems();
  }, [editTrigger]);

  //   Get to-do Items from the Database.
  async function getItems() {
    try {
      const response = await axios.get("http://localhost:5000/todos");

      setTodoItems(response.data);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  }

  //   Delete to-do Item from the Database with specified id.
  async function deleteItem(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodoItems(todoItems.filter((todo) => todo.id != id));
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  
 

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td><Edit todo={todo} setEditTrigger={setEditTrigger}/></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
