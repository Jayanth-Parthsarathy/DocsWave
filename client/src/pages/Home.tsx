import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Document } from "../types/document";
import { Socket } from "socket.io-client";
import { format } from "date-fns"; // Import the format function from date-fns
import { FilePlus, Grip, Plus, PlusIcon } from "lucide-react";

type Props = {
  socket: Socket;
};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const handleDocumentClick = async (documentId: string) => {
    navigate("/document/" + documentId);
  };
  const handleCreateDocument = () => {
    navigate("/create");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const fetchUserDocuments = async () => {
      const { data } = await axios.get("/document/");
      setDocuments(data);
    };
    fetchUserDocuments();
  }, []);

  return (
    <div className="h-full w-full ml-20 mt-10">
      <h1 className="text-5xl text-white text-center mb-10 underline underline-offset-4">
        DocWave ✨{" "}
      </h1>
      <div className="text-white grid grid-cols-4 gap-5 grid-flow-row">
        {" "}
        {documents.map((document) => (
          <div
            className="bg-[#313338] flex flex-col shadow-md transform
                                transition duration-500 hover:scale-110 shadow-gray-700 hover:shadow-gray-500 hover:shadow-xl h-60 w-60 m-2 bg-gradient-to-r from-[#313338] to-gray-700 justify-between p-5"
            key={document.id}
          >
            <div className="flex justify-between">
              <button onClick={() => handleDocumentClick(document.id)}>
                {document.title}
              </button>
              <Grip className="cursor-pointer" />
            </div>
            <p className="text-gray-400 mt-2">
              Last Opened:{" "}
              {format(new Date(document.updatedAt), "MMM dd HH:mm")}
            </p>
          </div>
        ))}
        <FilePlus
          size={40}
          className="fixed p-5 right-4 bottom-4 rounded-full bg-green-600 h-20 w-20 text-white cursor-pointer"
          onClick={handleCreateDocument}
        />
      </div>
    </div>
  );
};

export default Home;
