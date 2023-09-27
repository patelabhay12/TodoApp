import React, { useEffect, useState } from 'react';
import Header from './Main/Header';
import Todo from './Main/Todo';
import TodoModal from './Main/TodoModal';
import { getTodoList, getToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [todolist, setTodolist] = useState([]);
    const [refereshList, setrefereshList] = useState([]);
    const [searchText, setSearchText] = useState("");

    const [filteredList, setSetFilteredList] = useState([]);

    useEffect(() => {
        if (!getToken()) {
            navigate("/login");
        }
        getAlltodo();
    }, [refereshList])


    useEffect(() => {
        if (searchText === "") {
            setSetFilteredList(todolist);
        } else {
            const filterlist = todolist.filter(todo => todo.desc.toLowerCase().includes(searchText.toLocaleLowerCase().trim()));
            setSetFilteredList(filterlist);
        }





    })


    const getAlltodo = async () => {
        try {
            const result = await getTodoList();
            console.log("Todolist ", result);

            if (result.status === 200 && result.data.status === 200) {
                const todos = result.data.data.todos;
                setTodolist(todos.reverse());
            } else {

                console.error("Received a non-200 status or data status:", result.status);
            }
        } catch (error) {

            console.error("Error while fetching todos:", error);
        }
    };


    return (
        <>
            <Header searchText={searchText} setSearchText={setSearchText} />

            <div className="container">
                <div className="row justify-content-md-center mt-4">

                    {
                        filteredList?.map((todo) => {
                            return (
                                <Todo todo={todo} key={todo._id} setrefereshList={setrefereshList} />
                            )
                        })
                    }

                    {
                        filteredList.length === 0 &&
                        (
                            <div className="notFoundTodos">
                                No todos Found
                            </div>
                        )


                    }



                </div>
            </div>

            <div style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
                <button
                    type='button'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal' // Corrected modal ID
                    className='btn btn-outline-light'
                >
                    Add
                </button>
            </div>

            <TodoModal setrefereshList={setrefereshList} />



        </>
    );
};

export default Home;
