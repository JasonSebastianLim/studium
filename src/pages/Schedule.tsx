import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
}

const App = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Event>({
    id: "",
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | [Date, Date]>(new Date());

  const handleDateChange = (value: Date | [Date, Date], event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async () => {
    if (!form.title || !form.description || !form.start || !form.end) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      fetchEvents();
      setForm({ id: "", title: "", description: "", start: "", end: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-white p-6">
      <header className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-b-lg p-4 shadow-sm">
        <img src="/assets/Logo.png" alt="Logo" className="h-8 w-8" />
        <nav className="flex space-x-6">
          <Link href="/" className="text-white font-semibold hover:text-purple-400">
            Home
          </Link>
          <Link href="/Schedule" className="text-white font-semibold hover:text-purple-400">
            Schedule
          </Link>
          <Link href="/SoloStudy" className="text-white font-semibold hover:text-purple-400">
            Solo Study
          </Link>
          <Link href="/Analytics" className="text-white font-semibold hover:text-purple-400">
            Analytics
          </Link>
        </nav>
      </header>

      <h1 className="text-4xl font-bold text-center text-white mb-6">Schedule Your Events</h1>

      <div className="flex flex-col items-center space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
          <Calendar
            value={selectedDate}
            onChange={(value, event) => handleDateChange(value as Date | [Date, Date], event)}
            className="w-full text-black bg-gray-200 border border-gray-500"
          />

          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Event Title (e.g., Team Meeting)"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Event Description (e.g., Discuss Q4 Strategy)"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="datetime-local"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
              <input
                type="datetime-local"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={addEvent}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              Add Event
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Scheduled Events</h2>
          <ul className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.id} className="flex items-center justify-between p-4 border rounded-lg bg-purple-50">
                  <div>
                    <h3 className="font-semibold text-purple-800">{event.title}</h3>
                    <p className="text-gray-600">
                      {new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}
                    </p>
                    <p className="text-gray-500">{event.description}</p>
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="p-2"
                  >
                    <img
                      src="/assets/delete.png"
                      alt="Delete Icon"
                      className="h-6 w-6 hover:opacity-80 transition"
                    />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No events added yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
