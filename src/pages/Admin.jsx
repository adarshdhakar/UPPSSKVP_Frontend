import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Mail, Lock } from "lucide-react";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with login logic (e.g., API call)
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back, Admin!",
    });
  };

  const handlePasswordReset = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your email address!",
      });
      return;
    }
    // Replace with password reset logic (e.g., API call)
    Swal.fire({
      icon: "success",
      title: "Reset Link Sent",
      text: `A password reset link has been sent to ${email}.`,
    });
    setIsResetModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-700 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
                required
              />
              <Mail className="absolute top-2.5 right-3 text-gray-500" size={20} />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
              <Lock className="absolute top-2.5 right-3 text-gray-500" size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <a
              href="#"
              className="text-indigo-600 hover:underline text-sm"
              onClick={() => setIsResetModalOpen(true)}
            >
              Forgot Password?
            </a>
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Login
          </Button>
        </form>
      </div>

      {/* Password Reset Modal */}
      <Modal
        show={isResetModalOpen}
        size="md"
        onClose={() => setIsResetModalOpen(false)}
      >
        <Modal.Header>Password Reset</Modal.Header>
        <Modal.Body>
          <p className="text-gray-700 mb-4">
            Enter your email address to receive a password reset link.
          </p>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handlePasswordReset}
          >
            Send Reset Link
          </Button>
          <Button
            color="gray"
            onClick={() => setIsResetModalOpen(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminLogin;
