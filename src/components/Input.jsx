import { Fragment, useState } from "react";
import axios from 'axios';
export default function Input() {
  const [description, setDescription] = useState("");

  async function handleClick(e){
    e.preventDefault();

    const data={description};
    try {
      const response=await axios.post("http://localhost:5000/todos",data);
      console.log("Data submitted:",response.data);
      setDescription("");
      window.location='/';
    } catch (err) {
      console.error(err.message);
    }
    
  }
  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern To Do List</h1>
      <form className="d-flex mt-5 ">
        <input
          onChange={(event)=>{setDescription(event.target.value);}}
          type="text" 
          className="form-control" 
          value={description} 

         />
        <button className="btn btn-success" onClick={handleClick}>Add</button>
      </form>
    </Fragment>
  );
}
