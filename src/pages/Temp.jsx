import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to{' '}
            <span className="px-3 py-2 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 rounded-lg text-white font-bold">
              EduPoint
            </span>
          </h2>
          <p className="text-xl mb-6">
            Your one-stop solution for all educational needs
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/get-started"
              className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg text-xl transition"
            >
              Get Started
            </a>
            <a
              href="/about-us"
              className="bg-indigo-700 hover:bg-indigo-800 text-white py-3 px-6 rounded-lg text-xl transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>

      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="container mx-auto text-center px-6">
          <div className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span className="typewriter typewriter-repeating">
              Empowering Minds, Shaping Futures
            </span>
            <br />
            <br />
          </div>

          <h3 className="text-3xl font-bold mb-8 text-white">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h4 className="text-2xl font-semibold mb-4">Interactive Courses</h4>
              <p className="text-gray-600">
                Learn through interactive lessons and quizzes designed for all
                learning styles.
              </p>
              <a
                href="/courses"
                className="text-blue-600 font-semibold hover:underline mt-4 block"
              >
                Explore Courses →
              </a>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h4 className="text-2xl font-semibold mb-4">Live Sessions</h4>
              <p className="text-gray-600">
                Join live classes with experts and ask questions in real-time.
              </p>
              <a
                href="/live-sessions"
                className="text-blue-600 font-semibold hover:underline mt-4 block"
              >
                Join Live Sessions →
              </a>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h4 className="text-2xl font-semibold mb-4">Personalized Learning</h4>
              <p className="text-gray-600">
                Get a personalized learning path based on your progress and
                goals.
              </p>
              <a
                href="/personalized-learning"
                className="text-blue-600 font-semibold hover:underline mt-4 block"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-6">Why Choose EduPoint?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Expert Instructors</h4>
              <p>
                Learn from industry leaders and subject matter experts with
                years of experience.
              </p>
            </div>
            <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Flexible Learning</h4>
              <p>
                Study at your own pace with 24/7 access to all resources and
                materials.
              </p>
            </div>
            <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Certification</h4>
              <p>
                Earn certificates to showcase your achievements and boost your
                career.
              </p>
            </div>
            <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Community Support</h4>
              <p>
                Connect with peers, share ideas, and grow together in a
                supportive environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-6">Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <p className="text-gray-600 italic">
                "EduPoint has transformed my learning experience. The courses
                are amazing!"
              </p>
              <h5 className="text-blue-700 font-bold mt-4">- Jane Doe</h5>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <p className="text-gray-600 italic">
                "Live sessions with experts helped me clarify my doubts and
                excel in my field."
              </p>
              <h5 className="text-blue-700 font-bold mt-4">- John Smith</h5>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <p className="text-gray-600 italic">
                "I love the personalized learning paths. They keep me on track
                and motivated."
              </p>
              <h5 className="text-blue-700 font-bold mt-4">- Sarah Lee</h5>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
