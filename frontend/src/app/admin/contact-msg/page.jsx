"use client";

import { IconMail, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyModal, setReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/contact/getall");
      setMessages(res.data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/contact/delete/${id}`);
      if (res.status === 200) {
        fetchMessages();
        toast.success("Message Deleted Successfully");
      }
    } catch (error) {
      toast.error("Failed To Delete");
    }
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setReplyModal(true);
  };

  const sendReply = async () => {
    if (!replyText.trim()) return toast.error("Reply cannot be empty");

    try {
      await axios.post("http://localhost:5000/contact/reply", {
        email: selectedMessage.email,
        reply: replyText,
      });
      toast.success("Reply sent successfully!");
      setReplyModal(false);
      setReplyText("");
    } catch (error) {
      toast.error("Failed to send reply");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Contact Messages</h1>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-4">
        {loading ? (
          <p className="text-center text-gray-500 text-2xl font-bold">Loading... Please Wait</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Message</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Reply</th>
                  <th className="p-3 border">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {messages.map((msg) => (
                  <tr key={msg._id} className="border-b hover:bg-gray-100">
                    <td className="p-3 border">{msg._id}</td>
                    <td className="p-3 border">{msg.name}</td>
                    <td className="p-3 border">{msg.email}</td>
                    <td className="p-3 border">{msg.message}</td>
                    <td className="p-3 border">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleReply(msg)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        <IconMail size={20} />
                      </button>
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        <IconTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {replyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Reply to {selectedMessage.name}</h2>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-between">
              <button
                onClick={sendReply}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send Reply
              </button>
              <button
                onClick={() => setReplyModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
