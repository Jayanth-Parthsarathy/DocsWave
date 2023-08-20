import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Document } from "../types/document";
import { Socket } from "socket.io-client";
import Editor from "../components/Editor";
import { Lock } from "lucide-react";

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
  useEffect(() => {
    props.socket.emit("document", id);
    return () => {
      props.socket.emit("leave", id);
    };
  }, [props.socket, id]);
  return (
    <div className="h-full w-full p-10 text-white flex flex-col items-center gap-5 mb-20">
      <h1 className="text-3xl mb-3 border-b-white border-b-2">DocWave ✨</h1>
      <div className="h-full w-full">
        <div className="flex justify-between mb-6">
          <div className="text-2xl mx-auto">{document?.title}</div>
          <button className="mr-5 flex gap-4">
            <Lock size={20} className="mt-1" />
            <div className="text-lg">Share</div>
          </button>
        </div>
        <Editor socket={props.socket} />
      </div>
    </div>
  );
};

export default DocumentView;
