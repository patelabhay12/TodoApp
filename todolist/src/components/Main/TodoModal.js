import React, { useState } from 'react'
import {
    ToastContainer,
    toast
} from 'react-toastify'
import { addtodo } from '../../services/api.js';
const TodoModal = ({ setrefereshList }) => {

    const [tododesc, setTododesc] = useState('');


    const hanldeAddTodo = async () => {
        console.log(tododesc);
        if (tododesc === '') {
            toast("Todo is required")
        }

        try {
            const result = await addtodo({ desc: tododesc });


            if (result.status === 200) {
                toast("todo Added");
                setrefereshList(new Date());
                setTododesc('');
            } else {
                toast(result.data.message);
            }
        } catch (error) {
            if (error.response) {

                console.error('Server responded with error:', error.response.status, error.response.data);
            } else if (error.request) {

                console.error('No response received:', error.request);
            } else {

                console.error('Error:', error.message);
            }
        }

    }

    
    return (
        <div className="modal mt-5" id='exampleModal'>
            <ToastContainer />
            <div className="modal-dialog" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Todo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <span arial-hidden="true"></span>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <textarea
                                name=""
                                className='form-control'
                                placeholder='write todos...'
                                rows={3}
                                onChange={(e) => setTododesc(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-secondary'
                            onClick={hanldeAddTodo} data-bs-dismiss="modal"
                        >Save Todo</button>
                        <button className='btn btn-secondary'
                            onClick={() => { setTododesc('') }} data-bs-dismiss="modal">Close Todo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoModal