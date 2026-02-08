"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface HistoryItem {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history");
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="p-5">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-5 text-center">Usage History</h1>
      {history.length === 0 ? (
        <p className="text-center text-gray-500">No history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Template</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Form Data</th>
                <th className="border border-gray-300 px-4 py-2 text-left">AI Response</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Words</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <td className="border border-gray-300 px-4 py-2">{item.templateSlug}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.formData.length > 50 ? (
                      <span
                        className="cursor-pointer text-blue-600 underline"
                        data-tooltip-id={`tooltip-${item.id}-formData`}
                      >
                        {item.formData.substring(0, 50)}...
                        <Tooltip id={`tooltip-${item.id}-formData`} place="top">
                          {item.formData}
                        </Tooltip>
                      </span>
                    ) : (
                      item.formData
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.aiResponse.length > 50 ? (
                      <span
                        className="cursor-pointer text-blue-600 underline"
                        data-tooltip-id={`tooltip-${item.id}-aiResponse`}
                      >
                        {item.aiResponse.substring(0, 50)}...
                        <Tooltip id={`tooltip-${item.id}-aiResponse`} place="top">
                          {item.aiResponse}
                        </Tooltip>
                      </span>
                    ) : (
                      item.aiResponse
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.aiResponse.split(/\s+/).filter((word) => word).length}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-purple-700 text-white px-3 py-1 rounded-md hover:bg-purple-500"
                      onClick={() =>
                        navigator.clipboard
                          .writeText(item.aiResponse)
                          .then(() => {
                            toast.success("Content copied to clipboard!", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          })
                          .catch((err) => {
                            toast.error("Failed to copy content!", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                            console.error("Failed to copy content: ", err);
                          })
                      }
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
