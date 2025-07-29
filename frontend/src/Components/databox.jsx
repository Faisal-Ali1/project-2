import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import TaskCreate from "./tasks";

function DataBox({ data }) {

    const [task, setTask] = useState(null);
    const [change, setChange] = useState(false);
    const [newTaskValue, setNewTaskValue] = useState("");
    const [isTaskUpdate, setisTaskUpdate] = useState(false);

    
// submiting Task
    const handleSubmitTask = () => {
        try {

            console.log(newTaskValue);
            // axiosClient.patch(`/updatetask/${taskId}/${groupId}`, { value })
            setisTaskUpdate(!isTaskUpdate);

        }
        catch (err) {
            console.log('Error: ', err.message);

        }
    }

    // Fetching all Tasks
    useEffect(() => {
        async function fetchData() {
            const { data } = await axiosClient.get('/getall');
            setTask(data);
        }

        fetchData()
    }, [data, change]);

    return (
        <>
            <div className=" flex gap-10 flex-wrap justify-center p-10 text-center border relative">
                {
                    // updating task
                    isTaskUpdate ? (
                        
                        <div className="border p-10 fixed bg-white z-999 top-50 rounded-xl">

                            {/* cut button */}
                            <button 
                                className="font-bold relative -top-9 -right-41 cursor-pointer"
                                onClick={()=> setisTaskUpdate(!isTaskUpdate)}>X</button>

                            {/* updation Task box */}
                            <div className=" flex flex-col">

                            {/* label */}
                            <label className="label">Enter Task</label>

                            {/* input box */}
                            <input type="text"

                                className="input mb-5 w-70"
                                onChange={(e) => setNewTaskValue(e.target.value)} />
                            </div>

                            {/* Submit button */}
                            <button className="btn btn-primary"
                                onClick={() => handleSubmitTask()}>Submit</button>

                        </div>
                    ) : ""
                }
                {
                    task?.map((items, index) => <TaskCreate key={index} data={{items , isTaskUpdate , change, setChange, setisTaskUpdate  }}/>)
                }
            </div>
        </>
    )
}

export default DataBox;