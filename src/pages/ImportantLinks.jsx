import React, { useState } from "react";
import { Button } from "flowbite-react";
import { X } from "lucide-react";

const ImportantLinks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const links = [
    { email: "dmvar@nic.in", website: "upbasiceduparishad.gov.in" },
    { email: "varanasi.bsa@gmail.com", website: "http://upbasiceduparishad.gov.in/default.aspx" },
    { email: "varanasi.bsa@gmail.com", website: "http://jansunwai.up.nic.in" },
    { email: "brcsewapuri@gmail.com", website: "http://shasanadesh.up.gov.in" },
    { email: "brcbaragaon@gmail.com", website: "http://shasanadesh.up.gov.in" },
    { email: "brcharhua@gmail.com", website: "http://Upmdm.org" },
    { email: "brcpindra@gmail.com", website: "" },
    { email: "brcarajilines@gmail.com", website: "" },
    { email: "brckashividhyapith@gmail.com", website: "" },
    { email: "brccholapur@gmail.com", website: "" },
    { email: "brcchiraigaon@gmail.com", website: "" },
    { email: "nagarbeo@gmail.com", website: "" },
    { email: "varanasi.bsa@gmail.com", website: "" },
  ];

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-400 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Important Links</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Email ID</th>
                <th className="border border-gray-300 px-4 py-2">Website</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{link.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {link.website ? (
                      <a
                        href={link.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link.website}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Button
                      onClick={() => handleLinkClick(link)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 text-gray-800 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">Link Details</h3>
            <p className="text-lg">
              <strong>Email ID:</strong> {selectedLink.email}
            </p>
            <p className="text-lg">
              <strong>Website:</strong>{" "}
              {selectedLink.website ? (
                <a
                  href={selectedLink.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectedLink.website}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantLinks;
