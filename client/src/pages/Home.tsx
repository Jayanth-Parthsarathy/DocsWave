import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Document, SharedDocument } from "../types/document";
import { format } from "date-fns"; // Import the format function from date-fns
import {
  FilePlus,
  Grip,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";


const Home = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [sharedDocuments, setSharedDocuments] = useState<SharedDocument[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);
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
  useEffect(() => {
    const fetchSharedDocuments = async () => {
      const { data } = await axios.get("/document/shared/all");
      setSharedDocuments(data);
    };
    fetchSharedDocuments();
  }, []);
  const toggleButton = () => {
    setToggle(!toggle);
  };

  return (
    <div className="h-full w-full ml-20 mt-10">
      {toggle ? (
        <div>
          <ToggleLeft color="white" size={49} onClick={toggleButton} />
          <h1 className="text-5xl text-white text-center mb-20 cursor-pointer underline underline-offset-4">
            DocWave ✨{" "}
          </h1>
          <div className="text-white grid grid-cols-4 gap-5 grid-flow-row">
            {documents.map((document) => (
              <div
                className="bg-[#313338] flex flex-col shadow-md transform
                                transition duration-500 hover:scale-110 shadow-gray-700 hover:shadow-gray-500 hover:shadow-xl h-60 w-60 m-2 bg-gradient-to-r from-[#313338] to-gray-700 justify-between p-5"
                key={document.id}
                onClick={() => handleDocumentClick(document.id)}
              >
                <div className="flex justify-between">
                  <div>{document.title}</div>
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
      ) : (
        <div className="">
          <ToggleRight color="white" size={49} onClick={toggleButton} />
          <h1 className="text-5xl text-white text-center mb-20 cursor-pointer underline underline-offset-4">
            DocWave ✨{" "}
          </h1>
          <h2 className="text-white text-3xl">Shared With You</h2>
          <div className="text-white grid grid-cols-4 gap-5 grid-flow-row">
            {sharedDocuments.map((document) => (
              <div
                className="bg-[#313338] flex flex-col shadow-md transform
                                transition duration-500 hover:scale-110 shadow-gray-700 hover:shadow-gray-500 hover:shadow-xl h-60 w-60 m-2 bg-gradient-to-r from-[#313338] to-gray-700 justify-between p-5"
                key={document.id}
                onClick={() => handleDocumentClick(document.documentId)}
              >
                <div className="flex justify-between">
                  <div>{document.document.title}</div>
                  <Grip className="cursor-pointer" />
                </div>
                <p className="text-gray-400 mt-2">
                  Last Opened:{" "}
                  {format(
                    new Date(document.document.updatedAt),
                    "MMM dd HH:mm",
                  )}
                </p>
                <p>{document.permissions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
