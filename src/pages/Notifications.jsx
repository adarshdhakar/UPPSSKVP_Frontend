import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import Swal from 'sweetalert2';
import { Bell, CheckCircle, XCircle } from 'lucide-react';

const Notifications = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New message received', type: 'info' },
    { id: 2, message: 'Your profile has been updated', type: 'success' },
    { id: 3, message: 'Password change failed', type: 'error' },
    { id: 4, message: 'New comment on your post', type: 'info' },
  ]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const showAlert = (type) => {
    switch (type) {
      case 'success':
        Swal.fire({
          title: 'Success!',
          text: 'Your action was successful.',
          icon: 'success',
          confirmButtonText: 'Close',
        });
        break;
      case 'error':
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong.',
          icon: 'error',
          confirmButtonText: 'Close',
        });
        break;
      case 'info':
        Swal.fire({
          title: 'Info!',
          text: 'Here is some important information.',
          icon: 'info',
          confirmButtonText: 'Close',
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 via-teal-600 to-green-600 py-12 mt-10">
      <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Notifications</h1>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md ${
                notification.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : notification.type === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                {notification.type === 'success' && <CheckCircle className="text-green-700" />}
                {notification.type === 'error' && <XCircle className="text-red-700" />}
                {notification.type === 'info' && <Bell className="text-blue-700" />}
                <p>{notification.message}</p>
              </div>
              <button
                onClick={() => showAlert(notification.type)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {/* Modal Trigger */}
        <div className="mt-8 text-center">
          <button
            onClick={handleModalOpen}
            className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white py-2 px-6 rounded-lg"
          >
            Show More Details
          </button>
        </div>

        {/* Modal for Additional Info */}
        <Modal show={modalOpen} onClose={handleModalClose}>
          <Modal.Header>
            <h3 className="text-xl font-bold text-blue-700">Notification Details</h3>
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-700">
              This is a detailed view of your notifications. You can see more information and take necessary actions.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleModalClose}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Notifications;
