import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Document } from "../types/document";

const Home = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
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
          <a href={`document/${document.id}`}> {document.title}</a>
        </div>
      ))}
    </div>
  );
};

export default Home;
