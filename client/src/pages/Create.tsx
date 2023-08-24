import { FormEvent, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate()
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    const { data } = await axios.post("/document/create", { title });
    navigate("/document/"+data.id)
  };
  return (
    <div className="h-full w-full bg-black text-white flex items-center justify-center bg-no-repeat bg-cover">
      <div className="h-[500px] w-[500px] bg-[#313338] rounded-lg p-5 px-20">
        <div className="text-center mt-14">
          <h1 className="text-5xl">DocWave ✨ </h1>
        </div>
        <div className="text-center">
          <h1 className="text-3xl text-bold mt-7">Create Document</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-3">
          <div className="text-center">
            <h5 className="text-lg text-bold mt-5 text-[#B5BAC1]">Document Title</h5>
            <input
              type="text"
              value={title}
              className="p-1 h-12 w-full mt-3 border-none outline-none rounded-md bg-gray-200 text-black text-lg pl-5"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="mt-6 h-12 w-full bg-blue-600 rounded-md hover:bg-gray-700 text-lg text-bold"
              type="submit"
            >
              Create Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
