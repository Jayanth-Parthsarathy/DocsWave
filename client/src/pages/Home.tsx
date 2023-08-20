import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Document } from "../types/document";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};
const Home = (props: Props) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const handleDocumentClick = async (documentId: string) => {
    navigate("/document/" + documentId);
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
    <div>
      {documents.map((document) => (
        <div key={document.id}>
          <button onClick={() => handleDocumentClick(document.id)}>
            {" "}
            {document.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
