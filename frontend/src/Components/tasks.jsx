import { useEffect } from "react";
import axiosClient from "../utils/axiosClient";

function TaskCreate({ data }) {
    // console.log(data);
    // console.log(data.items.allTask);

    const handleTaskDelete = async (taskId, groupId) => {
        try {
            await axiosClient.post('/deletetask', { taskId, groupId });
            data.setChange(!data.change);

        }
        catch (err) {
            console.log('Error: ', err.message);

        }
    }

    const handleGroupDelete = async (id) => {
        try {
            console.log(id);

            await axiosClient.delete(`/delete/${id}`);
            data.setChange(!data.change);

        }
        catch (err) {
            console.log('Error: ', err.message);

        }
    }

    const handelTaskUpdate = (taskId, groupId) => {
        try {
            console.log(taskId, groupId);
            data.setisTaskUpdate(!data.isTaskUpdate);

        }
        catch (err) {
            console.log('Error: ', err.message);

        }
    }

    useEffect(() => {
        function fetchTask() {
            try {
                // axiosClient.get()
            }
            catch (err) {
                console.log('Error: ', err.message);

            }
        }

        fetchTask();
    }, []);

    return (

        <>

            {/* group-box */}
            <div className="border rounded-2xl p-5 shadow-xl">
                {/* group name */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mb-5 mt-2 ">{data?.items?.group_name}</h2>
                    <button className="btn btn-error text-xs" onClick={() => handleGroupDelete(data?.items?._id)}>Delete</button>
                </div>

                {/* Task Table*/}
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>#</th>
                            <th>#</th>
                            <th>#</th>

                        </tr>
                    </thead>
                    <tbody>

                        {

                            data?.items?.allTask?.map((item, idx) => (
                                <tr key={idx}>

                                    <td className="text-xs">{idx + 1}.</td>
                                    <td>
                                        
                                        {/* Task name */}
                                        <p className=" w-40 font-semibold">{item?.task}</p></td>

                                        {/* Task delete button */}
                                    <td> <button
                                        className="text-red-500  text-xs cursor-pointer"
                                        onClick={() => handleTaskDelete(item._id, data?.items?._id)}>
                                        delete
                                    </button></td>

                                    {/* Task update button */}
                                    <td> <button
                                        className="text-blue-500 text-xs cursor-pointer"
                                        onClick={() => handelTaskUpdate(item._id, data?.items?._id)}>
                                        update
                                    </button></td>

                                    {/* Task move button */}
                                    <td>   <button
                                        className="text-yellow-500 text-xs cursor-pointer">move</button></td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>

        </>
    )
}

export default TaskCreate;