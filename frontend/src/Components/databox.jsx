import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

function DataBox({ data }) {

    const [task, setTask] = useState(null);

    const handleDelete = async (taskId, groupId) => {
        try {
            // await axiosClient.delete('/')
            console.log(`taskid : ${taskId} , \n groupid: ${groupId}`);

        }
        catch (err) {
            console.log('Error: ', err.message);

        }
    }

    const handleGroupDelete = async(id) =>{
        try{
            console.log(id);
            
           await axiosClient.delete(`/delete/${id}`);
           
        }
        catch(err){
            console.log('Error: ' , err.message);
            
        }
    }

    useEffect(() => {
        async function fetchData() {
            const { data } = await axiosClient.get('/getall');
            setTask(data);
        }

        fetchData()
    }, [data]);

    return (
        <>
            <div className="border flex gap-10 flex-wrap justify-center p-10 text-center">
                {
                    task?.map((items, index) => (
                        // group-box
                        <div className="border rounded-2xl p-5 " key={index}>

                        {/* group name */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold mb-5 mt-2 ">{items?.group_name}</h2>
                            <button className="btn btn-error text-xs" onClick={() => handleGroupDelete(items._id)}>Delete</button>
                            </div>

                            {/* Task */}
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
                                        items?.allTask?.map((item, idx) => (
                                            <tr>
                                               
                                                <td className="text-xs">{idx + 1}.</td>
                                                <td> <p className=" w-40 font-semibold">{item?.task}</p></td>
                                                <td> <button
                                                    className="text-red-500  text-xs cursor-pointer"
                                                    onClick={() => handleDelete(item._id, items._id)}>
                                                    delete
                                                </button></td>
                                                <td> <button
                                                    className="text-blue-500 text-xs cursor-pointer">
                                                    update
                                                </button></td>
                                                <td>   <button className="text-yellow-500 tezt-xs cursor-pointer">move</button></td>
                                               
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default DataBox;