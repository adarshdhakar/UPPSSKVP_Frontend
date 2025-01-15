import React from 'react';
import { Modal } from 'flowbite-react';
import Swal from 'sweetalert2';

const AboutUs = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const showAlert = () => {
    Swal.fire({
      title: 'Welcome to our organization!',
      text: 'We are dedicated to improving the education system.',
      icon: 'success',
      confirmButtonText: 'Close',
    });
  };

  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-400">
    <div className="container mx-auto px-6 py-16 space-y-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <p className="text-xl text-gray-700 mb-8">
          We are committed to providing quality education and improving the overall welfare of our teachers and students.
        </p>
      </div>

      {/* Vision & Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-200">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Our Vision</h2>
          <p className="text-gray-700">
            Our vision is to empower teachers with the necessary tools and support to create a better educational environment for the future generation. We believe in nurturing every child’s potential and ensuring their holistic development.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-200">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-gray-700">
            We aim to provide quality education to every student and ensure that teachers are given the respect and support they deserve. Through continuous improvement and collaboration, we strive to create a progressive and inclusive educational system.
          </p>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="text-center mb-12 bg-gradient-to-r from-teal-700 via-green-900 to-teal-700 p-12 rounded-lg shadow-xl">
        <h2 className="text-4xl font-semibold text-white mb-8">Our Leadership</h2>
        <div className="flex justify-center gap-12 mb-8">
          <div className="w-56 h-56 bg-gray-100 rounded-full overflow-hidden shadow-lg">
            <img
              src="/images/head1.jpg"
              alt="Head"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-56 h-56 bg-gray-100 rounded-full overflow-hidden shadow-lg">
            <img
              src="/images/head2.jpg"
              alt="Associate Head"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex justify-center gap-28">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Dr. John Doe</h3>
            <p className="text-gray-200">Head of Organization</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Mrs. Jane Smith</h3>
            <p className="text-gray-200">Associate Head</p>
          </div>
        </div>
      </div>


      {/* Key Points Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg mb-12 border border-gray-200">
        <h2 className="text-4xl font-semibold text-indigo-700 text-center mb-8">Our Key Focus Areas</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-4 text-xl">
          <li>Teachers' Service and Service Conditions</li>
          <li>Old Pension Scheme for Teachers</li>
          <li>Teacher Welfare and Support</li>
          <li>Improving Educational Infrastructure</li>
          <li>Enhancing Teacher Training Programs</li>
        </ul>
      </div>

      {/* Call to Action Section */}
      <div className="text-center mb-12">
        <button
          onClick={handleModalOpen}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition duration-300"
        >
          Learn More About Our Initiatives
        </button>
        <button
          onClick={showAlert}
          className="bg-indigo-600 text-white py-3 px-6 ml-10 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Learn More About Us
        </button>
      </div>

      {/* Modal for Additional Info */}
      <Modal show={modalOpen} onClose={handleModalClose}>
        <Modal.Header>
          <h3 className="text-xl font-bold text-indigo-700">Our Initiatives</h3>
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            We are actively working on improving the education system, ensuring the welfare of teachers, and enhancing the learning experience for students. Our focus is on providing better facilities, training, and support to all educators.
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

export default AboutUs;
