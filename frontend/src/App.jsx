import { useState } from "react";
import axiosClient from "./utils/axiosClient";
import DataBox from "./Components/databox";

function App() {

  const [groupName, setGroupName] = useState('');
  const [task, setTask] = useState('');
  const [isChange, setIsChange] = useState(false);


  // handlnig data submit
  const handleSubmit = async () => {

    if (!groupName)
      return alert('enter group_name');

    if (!task)
      return alert('enter task');

    console.log(`GroupName: ${groupName} \n Task:${task}`);

    // sending data to backend
    await axiosClient.post('/create', { group_name: groupName, task });
    setTask('');
    setIsChange(!isChange);
  }

  return (
    <>
      <div className="">
        <div className=" pb-10 absolute fixed w-full bg-white z-99">
          <h1 className="text-3xl font-bold text-center">Project-2</h1>


          <div className="flex justify-center items-center gap-5 mt-10">
            <div>
              <label className="label">Group name: </label>
              <input
                type="text"
                value={groupName}
                placeholder="Enter group name"
                onChange={(e) => { setGroupName(e.target.value) }}
                className="input" />
            </div>

            <div>
              <label className="label">Task: </label>
              <input
                type="text"
                value={task}
                placeholder="Enter task here"
                onChange={(e) => { setTask(e.target.value) }}
                className="input" />
            </div>
            <button className="mt-6 btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>

        <div className="pt-35">
          <DataBox data={{isChange , setIsChange}} />
        </div>

      </div>
    </>
  )
}

export default App;