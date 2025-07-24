import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

function DataBox({data}){

    const [ task , setTask] = useState(null);

    const handleDelete = () => {
        try{

        }
        catch(err){
            console.log('Error: ' , err.message);
            
        }
    }

    useEffect(()=>{
        async function fetchData(){
          const {data} = await axiosClient.get('/getall');
            setTask(data);
        }

        fetchData()
    } , [data]);

    return(
        <>
        <div className="border flex gap-10 flex-wrap p-10 text-center">
           {
            task?.map((item , index) => (
                
                <div className="border rounded-2xl p-5 " key={index}>
                    {
                        console.log(item)
                    }
                    <h2 className="text-xl font-bold mb-5 mt-2">{item?.group_name}</h2>
                    {
                        item?.allTask?.map((item , idx) => (
                            <div key={idx} className="flex gap-4 font-semibold mb-2">
                                <p>{item?.task}</p>
                                <button className="btn btn-error  text-xs">delete</button>
                                <button className="btn btn-primary text-xs">update</button>
                                <button className="btn btn-dash tezt-xs">move</button>
                            </div>
                        ))
                    }
                    
                    </div>
            ))
           }
        </div>
        </>
    )
}

export default DataBox;