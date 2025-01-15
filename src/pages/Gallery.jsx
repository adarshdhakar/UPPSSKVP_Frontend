import React, { useState } from "react";
import { X } from "lucide-react";

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: "https://cdn.pixabay.com/photo/2022/06/05/11/06/action-figures-7243788_960_720.jpg",
      alt: "Avengers Team",
    },
    {
      src: "https://images.unsplash.com/photo-1657558045738-21507cf53606?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Iron Man",
    },
    {
      src: "https://cdn.pixabay.com/photo/2019/08/25/06/43/captain-america-4428842_960_720.jpg",
      alt: "Captain America",
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/08/01/12/31/ai-generated-8162871_960_720.jpg",
      alt: "Thor",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1729262872775-f64f81ef4930?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Black Widow",
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_960_720.jpg",
      alt: "Hulk",
    },
  ];
  

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-400 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-bold">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-center mt-4 text-gray-700">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
