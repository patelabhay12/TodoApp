import React from 'react'
import moment from 'moment/moment';
import { deleteTodo, markReadTodo } from '../../services/api.js';
import { toast } from 'react-toastify';
const Todo = ({ todo, setrefereshList }) => {


    const handelDelete = async () => {
        try {
            const result = await deleteTodo({
                todo_id: todo._id
            });

            if (result.data.status === 200) {
                setrefereshList(new Date());
                toast("Deleted");
            } else {
                toast("Failed to delete, please try again");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server responded with:", error.response.status, error.response.data);
            }
        }

    };

    const handleMarkTodo = async () => {
        try {
            const result = await markReadTodo({
                todo_id: todo._id
            });

            if (result.data.status === 200) {
                setrefereshList(new Date());
                toast("Todo is Completed");
            } else {
                toast("Failed to complate, please try again");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server responded with:", error.response.status, error.response.data);
            }
        }

    };

    return (
        <div className="col-sm-3 mx-3 alert bg-gray">
            <div className="card-header" style={{ color: `${todo?.isCompleted ? "green" : " "}` }}>
                {todo?.isCompleted ? "Completed" : "Not Completed"}
            </div>
            <div className="card-body">
                <h5 className='card-title' style={{ textDecoration: todo?.isCompleted ? "line-through" : "none" }}>{todo?.desc}</h5>
                <p className='card-text'>{moment(todo?.date).fromNow()}</p>


            </div>
            <div className='actionBUttons mt-4' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="deleteButton">
                    <button className='' style={{ background: "red", border: "1px solid gray", borderRadius: "5px", padding: "7px" }}
                        onClick={handelDelete}
                    >Delete</button>
                </div>
                <div className="markTodo">
                    <button
                        style={{ background: `${todo?.isCompleted ? "green" : " "}`, border: "1px solid gray", borderRadius: "5px", padding: "7px" }}
                        onClick={handleMarkTodo}
                    >{todo?.isCompleted ? "Completed" : "Mark Completed"}</button>
                </div>
            </div>
        </div>
    )
}

export default Todo;