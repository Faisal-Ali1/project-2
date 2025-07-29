import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import TaskCreate from "./tasks";

function DataBox({ data }) {

    const [task, setTask] = useState(null);
    const [change, setChange] = useState(false);
    const [newTaskValue, setNewTaskValue] = useState({
        'value': '',
        'groupId': null,
        'taskId': null

    });
    const [isTaskUpdate, setisTaskUpdate] = useState(false);
    const [isMoveClicked, setisMoveClicked] = useState(false);
    const [moveTask , setMoveTask] = useState({
        'newGroupName': '',
        'groupId': null,
        'taskId': null
    });


    // submiting Task
    const handleSubmitTask = async () => {
        try {

            console.log(newTaskValue);
           const response = await axiosClient.patch(`/updatetask/${newTaskValue.groupId}/${newTaskValue.taskId}`, { newTask: newTaskValue.value });
           console.log(response.data);
           
            setisTaskUpdate(!isTaskUpdate);
            setChange(!change);

        }
        catch (err) {
            console.log('Error: ', err.message);

        }
    }

    const handleMoveTask = async() => {
        try{
            setisMoveClicked(!isMoveClicked)
            console.log(moveTask);
            await axiosClient.post(`/moveTask/${moveTask.groupId}/${moveTask.taskId}` , {newGroupName:moveTask.newGroupName});
            setMoveTask({...moveTask , newGroupName: ''});
            setChange(!change);
        }
        catch(err){
            console.log('Error: ' , err.message);
            
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
            <div className=" flex gap-10 flex-wrap justify-center p-10 text-center relative">
                {
                    // Task updation pop-up box
                    isTaskUpdate ? (
                        <div className="border p-10 fixed bg-white z-999 top-50 rounded-xl">

                            {/* cut button */}
                            <button
                                className="font-bold relative -top-9 -right-41 cursor-pointer"
                                onClick={() => setisTaskUpdate(!isTaskUpdate)}>X</button>

                            {/* updation Task box */}
                            <div className=" flex flex-col">

                                {/* label */}
                                <label className="label">Enter Task</label>

                                {/* input box */}
                                <input type="text"
                                    value={newTaskValue.value}
                                    className="input mb-5 w-70"
                                    onChange={(e) => setNewTaskValue({ ...newTaskValue, value: e.target.value })} />
                            </div>

                            {/* Submit button */}
                            <button className="btn btn-primary"
                                onClick={() => handleSubmitTask()}>Submit</button>

                        </div>
                    ) : ""
                }

                {/* Move pop-up */}
                {
                    isMoveClicked ? (
                        <div className="border p-10 fixed bg-white z-999 top-50 rounded-xl">
                            <div className="flex flex-col mb-5">
                                <label className="label font-semibold">Enter group name</label>
                            <input type="text" 
                                value={moveTask.newGroupName}
                                onChange={(e) => setMoveTask({...moveTask , newGroupName:e.target.value})}
                                className="input w-70"/>
                                
                            </div>
                            <button className="btn btn-warning" onClick={()=> handleMoveTask()}>Move</button>
                        </div>
                    ) : ''
                }

                {/* Printing all Tasks group wise */}
                {
                    task?.map((items, index) => <TaskCreate key={index} data={{ items, isTaskUpdate, change, setChange, setisTaskUpdate, setNewTaskValue , isMoveClicked , setisMoveClicked , moveTask , setMoveTask}} />)
                }
            </div>
        </>
    )
}

export default DataBox;