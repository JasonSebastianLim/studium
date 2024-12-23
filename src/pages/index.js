import { faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Add a fade-in effect when the page loads
    const main = document.querySelector('main');
    main.classList.add('opacity-0');
    setTimeout(() => {
      main.classList.remove('opacity-0');
      main.classList.add('opacity-100');
    }, 50);
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-pink-300 to-purple-400 min-h-screen">
      <header className="flex justify-between items-center bg-black-200 p-4 shadow-lg rounded-lg">
        <div className="flex items-center">
          <img src='/assets/Logo.png' alt="Logo" className="h-10 w-10 animate-pulse" />
        </div>
        <nav className="flex space-x-4">
          <Link href="/" className="text-white hover:text-purple-300 font-bold transition-colors duration-300">Home</Link>
          <Link href="/Schedule" className="text-white hover:text-purple-300 font-bold transition-colors duration-300">Schedule</Link>
          <Link href="/SoloStudy" className="text-white hover:text-purple-300 font-bold transition-colors duration-300">Solo Study</Link>
          <Link href="/Analytics" className="text-white hover:text-purple-300 font-bold transition-colors duration-300">Analytics</Link>
        </nav>
      </header>

      <main className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-700">
        <div className="space-y-8">
          <div className="bg-white p-4 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg text-black font-extrabold">Streaks:</h2>
            <div className="flex space-x-2 mt-2 group">
              {['M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center bg-pink-700 text-white rounded-full shadow-md transform transition-transform duration-300 group-hover:animate-bounce"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg text-black font-extrabold">Daily Task - 01 April 2024</h2>
            <p className="text-black mt-2">01 April, 2024</p>
            <hr className="my-2 border-purple-300" />
            <ul className="space-y-2">
              {['Learn Data Structures & Algorithms', 'Client Meeting', '3 Questions of Competitive Programming', 'Figma-Design'].map((task, index) => (
                <li key={index} className="flex items-center hover:bg-purple-500 p-2 rounded-lg transition-all duration-300">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-black font-bold">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-100 p-4 shadow-lg rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="bg-red-600 text-white animate-bounce px-2 py-1 rounded-full text-xs animate-pulse">LIVE</span>
              <h2 className="text-lg text-black font-extrabold">Join Live Sessions Now!</h2>
            </div>
            <div className="mt-4 space-y-4">
              {[
                { platform: 'YouTube', icon: faYoutube, title: 'Pewdiepie’s Study Session', desc: 'Join Pewdiepie for an interactive study session with discussions and Q&A on effective learning techniques!' },
                { platform: 'Zoom', icon: faVideo, title: 'Jacksepticeye’s Room', desc: 'Collaborate with fellow learners in Jacksepticeye’s live session! Engage in group discussions and tackle study challenges together.' },
                { platform: 'Discord', icon: faDiscord, title: 'Motion IME’s Channel', desc: 'Join Motion IME’s Discord channel to share resources, ask questions, and connect with peers for an enhanced learning experience!' },
              ].map((session, index) => (
                <div key={index} className="flex items-center bg-gradient-to-r from-pink-300 to-purple-400 p-4 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
                  <FontAwesomeIcon icon={session.icon} className="h-12 w-12 text-purple-500 animate-spin-slow" />
                  <div className="ml-4">
                    <h3 className="text-white font-bold">{session.title}</h3>
                    <p className="text-white text-sm">{session.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
