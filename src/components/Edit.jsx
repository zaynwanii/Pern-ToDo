import { Fragment ,useState} from "react";
import axios from 'axios';

export default function Edit({ todo ,setEditTrigger}) {
  const[description,setDescription]=useState(todo.description);

  async function handleClick(e){
    e.preventDefault();
    console.log({description});
    try {
      const response=await axios.put(`http://localhost:5000/todos/${todo.id}`,{description});
      setEditTrigger(prev=>!prev);
      
      // window.location='/';
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${todo.id}`}
      >
        Edit
      </button>

      {/* // <!-- The Modal --> */}
      <div className="modal" id={`${todo.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Task</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={(e)=>setDescription(todo.description)}
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <input 
              className="form-control"
               value={description}
               onChange={(e)=>setDescription(e.target.value)}
               >

               </input>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                onClick={(e)=>handleClick(e)}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Edit
              </button>
              
            
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                 onClick={(e)=>setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
