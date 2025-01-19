import { Carousel } from 'flowbite-react';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { useState } from "react";
import { X } from "lucide-react";

const Home = () => {
  const newsContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cloneNewsItems = () => {
      if (newsContainerRef.current) {
        const container = newsContainerRef.current;
        const items = container.querySelectorAll('li');
        items.forEach(item => {
          const clone = item.cloneNode(true);
          container.appendChild(clone);
        });
      }
    };

    cloneNewsItems();

    const scrollNews = () => {
      if (newsContainerRef.current) {
        const container = newsContainerRef.current;
        container.scrollTop += 1;
        if (container.scrollTop >= container.scrollHeight / 2) {
          container.scrollTop = 0;
        }
      }
    };

    const interval = setInterval(scrollNews, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Main Content Section */}
      <br />
      <br />

      <main className="bg-gradient-to-r from-indigo-800 to-gray-800 text-white py-20">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to PSSKVP</h2>
        <p className="text-xl mb-6">
          Empowering minds, shaping futures through education and social responsibility.
        </p>
        <p className="text-xl mb-6">
          शिक्षा और सामाजिक उत्तरदायित्व के माध्यम से मन को सशक्त करना, भविष्य को आकार देना।
        </p>

        {/* <h2 className="text-4xl font-bold mb-4">पीएसएसकेवीपी में आपका स्वागत है</h2>
        <p className="text-xl mb-6">
          शिक्षा और सामाजिक उत्तरदायित्व के माध्यम से मन को सशक्त करना, भविष्य को आकार देना।
        </p> */}

        <div className="flex justify-center space-x-4">
          <a
            href="/contactus"
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg text-xl transition"
          >
            Get Started
          </a>
          <a
            href="/aboutus"
            className="bg-indigo-700 hover:bg-indigo-800 text-white py-3 px-6 rounded-lg text-xl transition"
          >
            Learn More
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg text-xl transition"
          >
            दो शब्द
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 text-gray-800 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">संघे शक्ति सर्वदा</h3>
            <p className="text-lg leading-relaxed">
              प्रजातंत्रीय व्यवस्थान्र्तगत विधि मान्य संगठनों एवं संस्थाओं की भूमिका महत्वपूर्ण होती हैं। उत्तर प्रदेशीय प्राथमिक शिक्षक संघ प्राथमिक एवं उच्च प्राथमिक शिक्षकों का एक मात्र संगठन है जो शिक्षकों की सेवा सुरक्षा के साथ-साथ सामाजिक, आर्थिक, नैतिक एवं शिक्षा स्तरोन्नयन की दिशा में सदैव प्रयत्नशील है। संघ में जीवन्तता बनाये रखने हेतु पदाधिकारियों के साथ-साथ सदस्यों में भी नैतिक बोधगम्यता का होना आवश्यक है।
            </p>
          </div>
        </div>
      )}
    </main>

      {/* Latest News & Updates Section */}
      {/* <section className="py-16 bg-gray-200">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-8">Latest News & Updates</h3>
          <div ref={newsContainerRef} className="bg-white p-8 shadow-lg rounded-lg h-64 overflow-y-hidden">
            <ul className="space-y-4">
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">Annual Sports Day Announced</h4>
                <p className="text-gray-600">Join us for the Annual Sports Day on February 25th, 2025. Don't miss the excitement!</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">Science Exhibition 2025</h4>
                <p className="text-gray-600">Our Science Exhibition will showcase innovative projects on March 10th, 2025.</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">Admissions Open for 2025-2026</h4>
                <p className="text-gray-600">Admissions are now open! Apply before April 15th, 2025.</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">Parent-Teacher Meeting Scheduled</h4>
                <p className="text-gray-600">The next PTM will be held on February 20th, 2025. Your participation matters!</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">Workshop on Mental Health Awareness</h4>
                <p className="text-gray-600">Join our workshop on March 5th, 2025, to learn about mental well-being.</p>
              </li>
            </ul>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-gray-200">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-8">Latest News & Updates</h3>
          <div ref={newsContainerRef} className="bg-white p-8 shadow-lg rounded-lg h-64 overflow-y-hidden">
            <ul className="space-y-4">
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">विद्यालय संचालन का समय पूर्वाह्न 7:00 बजे से अपराह्न 11:00 बजे तक</h4>
                <p className="text-gray-600">परिषदीय विद्यालयों में बच्चों के स्वास्थ्य को ध्यान में रखते हुए, विद्यालय संचालन का समय पूर्वाह्न 7:00 बजे से अपराह्न 11:00 बजे तक निर्धारित किया गया है।</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">बेसिक शिक्षकों को वेतन न मिलने से समस्याएं</h4>
                <p className="text-gray-600">वेतन भुगतान में विलम्ब होने से शिक्षकों को आर्थिक नुकसान हो रहा है। वेतन शीघ्र भुगतान की आवश्यकता है।</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">ऑनलाइन एटेंडेंस संबंधित समस्याएं</h4>
                <p className="text-gray-600">04 मार्च को प्रदेश स्तर पर ऑनलाइन एटेंडेंस में आ रही समस्याओं को लेकर ज्ञापन प्रेषित किया जाएगा।</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">नारी शक्ति सम्मान समारोह</h4>
                <p className="text-gray-600">बीआरसी केसरीपुर में नारी शक्ति सम्मान समारोह का आयोजन किया गया, जिसमें महिला शिक्षकों को उनके योगदान के लिए सम्मानित किया गया।</p>
              </li>
              <li className="border-b pb-2">
                <h4 className="font-bold text-lg">पुरानी पेंशन बहाली के लिए संघर्ष</h4>
                <p className="text-gray-600">पुरानी पेंशन बहाली सहित 18 सूत्रीय मांगों को लेकर संघर्ष जारी रहेगा, और 4 सितम्बर को विशाल धरना प्रदर्शन आयोजित किया जाएगा।</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

     {/* Visual Highlights Section */}
     <section className="py-12 px-10 bg-gradient-to-r from-gray-600 to-cyan-900">
  <div className="container mx-auto">
    <h3 className="text-3xl font-bold mb-8 text-white text-center">Our Visual Highlights</h3>
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
      {/* First Carousel */}
      <div className="w-full lg:w-1/2">
        <Carousel className="h-80">
          <img
            src="/images/banner01.jpg"
            alt="Placeholder Image"
            className="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="/images/banner02.jpg"
            alt="Placeholder Image"
            className="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="/images/banner03.jpg"
            alt="Placeholder Image"
            className="w-full h-80 object-cover rounded-lg"
          />
        </Carousel>
      </div>
      {/* Second Carousel */}
      <div className="w-full lg:w-1/2">
        <Carousel className="h-80">
          <img
            src="/images/banner04.jpg"
            alt="Placeholder Image"
            className="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="/images/banner05.jpg"
            alt="Placeholder Image"
            className="w-full h-80 object-cover rounded-lg"
          />
          <img
            src="/images/banner06.jpg"
            alt="Placeholder Image"
            className="w-full h-80 object-cover rounded-lg"
          />
        </Carousel>
      </div>
    </div>
  </div>
</section>


      {/* Downloads Section */}
<section className="py-16 bg-gray-200">
  <div className="container mx-auto text-center px-6">
    <h3 className="text-3xl font-bold mb-6">Available Downloads</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h4 className="font-bold text-lg">Lucide-react</h4>
        <p className="text-gray-600">Customizable SVG icon library for React.</p>
        <Button
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-gradient-to-r from-blue-950 via-gray-800 to-black text-white"
        >
          Download
        </Button>
      </div>
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h4 className="font-bold text-lg">Lucide-react</h4>
        <p className="text-gray-600">Customizable SVG icon library for React.</p>
        <Button
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-gradient-to-r from-blue-950 via-gray-800 to-black text-white"
        >
          Download
        </Button>
      </div>
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h4 className="font-bold text-lg">Flowbite React</h4>
        <p className="text-gray-600">UI components built with TailwindCSS.</p>
        <Button
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-gradient-to-r from-blue-950 via-gray-800 to-black text-white"
        >
          Download
        </Button>

      </div>
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h4 className="font-bold text-lg">SweetAlert2</h4>
        <p className="text-gray-600">Beautiful, responsive, customizable popup boxes.</p>
        <Button
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-gradient-to-r from-blue-950 via-gray-800 to-black text-white"
        >
          Download
        </Button>
      </div>
      
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h4 className="font-bold text-lg">Redux Toolkit</h4>
        <p className="text-gray-600">Efficient state management for modern web applications.</p>
        <Button
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-gradient-to-r from-blue-950 via-gray-800 to-black text-white"
        >
          Download
        </Button>
      </div>
      
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
