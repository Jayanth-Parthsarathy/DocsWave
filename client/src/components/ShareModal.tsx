import { X } from "lucide-react";
import React, { useState } from "react";

type ShareModalProps = {
  onClose: () => void;
  onSubmit: (email: string, permission:string) => void;
};

const ShareModal: React.FC<ShareModalProps> = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, permission);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded-lg p-6 w-80 bg-gray-800">
        <X onClick={onClose} className="mb-1 ml-auto" />
        <h2 className="text-xl font-semibold mb-4">Share Document</h2>
        <form onSubmit={handleSubmit} className="text-black">
          <div className="mb-4">
            <label className="block mb-1 text-white">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black mb-3"
              required
            />
            <div className="w-full">
            <select onChange={(e)=>setPermission(e.target.value)} name="permission" id="permission" className="ml-auto mt-5 rounded-md px-3 py-2">
              <option value="none">Permission</option>
              <option value="VIEW">View</option>
              <option value="EDIT">Edit</option>
            </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareModal;
