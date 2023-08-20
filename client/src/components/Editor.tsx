import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import axios from "../utils/axios";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

type Props = {
  socket: Socket;
};

export default function TextEditor(props: Props) {
  const { id: documentId } = useParams();
  const [text, setText] = useState<any>(null);
  const [quill, setQuill] = useState<Quill>();

  useEffect(() => {
    if (props.socket == null || quill == null) return;
    const handler = (delta: any) => {
      quill.updateContents(delta);
    };
    props.socket.on("edit", handler);

    return () => {
      props.socket.off("edit", handler);
    };
  }, [props.socket, quill]);

  useEffect(() => {
    if (props.socket == null || quill == null) return;

    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== "user") return;
      props.socket.emit("edit", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [props.socket, quill]);
  useEffect(() => {
    if (quill == null) return;

    const interval = setInterval(async () => {
      const payload = { text: JSON.stringify(quill?.getContents()) };
      await axios.put(
        `/document/update/${documentId}`,
        payload,
      );
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [quill]);
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const { data } = await axios.get(`/document/${documentId}`);
        const obj = JSON.parse(data.text);
        setText(obj);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocument();
  }, [documentId]);

  useEffect(() => {
    if (quill && text) {
      quill.setContents(text);
    }
  }, [quill, text]);

  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
  }, []);
  return (
      <div className="container" ref={wrapperRef}></div>
  );
}
