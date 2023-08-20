import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Document } from "../types/document";
import { Socket } from "socket.io-client";
import Editor from "../components/Editor";

type Props = {
  socket: Socket;
};
const DocumentView = (props: Props) => {
  const { id } = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  useEffect(() => {
    const fetchDocument = async () => {
      const { data } = await axios.get(`/document/${id}`);
      setDocument(data);
    };
    fetchDocument();
  }, []);
  return (
    <div>
      <div>{document?.title}</div>
      <Editor socket={props.socket} />
    </div>
  );
};

export default DocumentView;
