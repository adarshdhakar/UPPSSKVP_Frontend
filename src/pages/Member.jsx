import React from "react";
import { Button } from "flowbite-react";

const members = [
  {
    name: "Amit Mishra",
    designation: "Vice President",
    email: "amitmishra@example.com",
    phone: "+91-9876543211",
  },
  {
    name: "Rajesh Kumar",
    designation: "Secretary",
    email: "rajesh@example.com",
    phone: "+91-9876543212",
  },
  {
    name: "Anita Sharma",
    designation: "Treasurer",
    email: "anita@example.com",
    phone: "+91-9876543213",
  },
];

const Members = () => {
  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-400 mt-10">
        <br/>
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Our Members</h1>
        <br/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="bg-green-600 text-white rounded-full h-20 w-20 flex items-center justify-center text-2xl font-bold">
                {member.name[0]}
              </div>
              <h2 className="mt-4 text-xl font-bold">{member.name}</h2>
              <p className="text-gray-600">{member.designation}</p>
              <p className="text-gray-600 mt-2">{member.email}</p>
              <p className="text-gray-600">{member.phone}</p>
            </div>
          ))}
        </div>
        <br/>
        <div className="text-center mt-12">
          <Button
            href="http://psskvp.org/08.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg text-xl transition"
          >
            View Full Member List (PDF)
          </Button>
        </div>
      </div>
      <br/>
    </div>
  );
};

export default Members;
