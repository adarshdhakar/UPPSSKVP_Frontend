import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, X } from 'lucide-react';
import Swal from 'sweetalert2';

// Redux Slice Example
const ADD_USER = 'ADD_USER';

const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

const userReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

const UserForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    panCardNumber: '',
    email: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, mobileNumber, panCardNumber, email } = formData;

    if (!fullName || !mobileNumber || !panCardNumber || !email) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields are required!',
      });
      return;
    }

    dispatch(addUser(formData));
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">User Information Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">PAN Card Number</label>
            <input
              type="text"
              name="panCardNumber"
              value={formData.panCardNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500"
              placeholder="Enter your PAN card number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500"
              placeholder="Enter your email ID"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
            Submit
          </Button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
          <Modal.Header>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={24} />
              <span className="font-bold">Submission Successful</span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="text-lg text-gray-700">Thank you, {formData.fullName}! Your information has been submitted successfully.</p>
            <div className="mt-4">
              <h4 className="font-bold text-gray-800">Submitted Data:</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li><strong>Full Name:</strong> {formData.fullName}</li>
                <li><strong>Mobile Number:</strong> {formData.mobileNumber}</li>
                <li><strong>PAN Card Number:</strong> {formData.panCardNumber}</li>
                <li><strong>Email ID:</strong> {formData.email}</li>
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-700 text-white">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserForm;
