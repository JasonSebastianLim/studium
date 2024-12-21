import { faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'; // Use Next.js's Link for navigation

export default function Home() {
  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <div className="flex items-center">
          <img src='/assets/Logo.png' alt="Logo" className="h-8 w-8" />
        </div>
        <nav className="flex space-x-4">
          {/* Update the links to use Next.js's Link component */}
          <Link href="/" className="text-purple-600 font-bold">Home</Link>
          <Link href="/SoloStudy" className="text-black font-bold">Solo Study</Link>
          <Link href="/Analytics" className="text-black font-bold">Analytics</Link>
        </nav>
      </header>
      <main className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-gray-100 p-4 shadow-md rounded-md">
            <h2 className="text-lg text-black font-bold">Streaks:</h2>
            <div className="flex space-x-2 mt-2">
              {['M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full">
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 p-4 shadow-md rounded-md">
            <h2 className="text-lg text-black font-bold">Daily Task - 01 April 2024</h2>
            <p className="text-black mt-2">01 April, 2024</p>
            <hr className="my-2" />
            <ul className="space-y-2">
              {['Learn Data Structures & Algorithms', 'Client Meeting', '3 Questions of Competitive Programming', 'Figma-Design'].map((task, index) => (
                <li key={index} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-black font-bold">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-gray-100 p-4 shadow-md rounded-md">
            <div className="flex items-center space-x-2">
              <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">LIVE</span>
              <h2 className="text-lg text-black font-bold">Join Live Sessions Now!</h2>
            </div>
            <div className="mt-4 space-y-4">
              {[
                { platform: 'YouTube', icon: faYoutube, title: 'Pewdiepie’s Study Session', desc: 'Join Pewdiepie for an interactive study session with discussions and Q&A on effective learning techniques!' },
                { platform: 'Zoom', icon: faVideo, title: 'Jacksepticeye’s Room', desc: 'Collaborate with fellow learners in Jacksepticeye’s live session! Engage in group discussions and tackle study challenges together.' },
                { platform: 'Discord', icon: faDiscord, title: 'Motion IME’s Channel', desc: 'Join Motion IME’s Discord channel to share resources, ask questions, and connect with peers for an enhanced learning experience!' },
              ].map((session, index) => (
                <div key={index} className="flex items-center bg-white p-4 shadow-md rounded-md">
                  <FontAwesomeIcon icon={session.icon} className="h-12 w-12 text-red-600" />
                  <div className="ml-4">
                    <h3 className="text-black font-bold">{session.title}</h3>
                    <p className="text-black">{session.desc}</p>
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
