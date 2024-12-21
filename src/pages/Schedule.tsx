import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from 'next/link';

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

  const handleDateChange = (value: Date | [Date, Date]) => {
    setSelectedDate(value);
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/events");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched events:", data); // Debug log
      setEvents(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching events:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  
  const addEvent = async () => {
    console.log("Form data being sent:", form); // Debug log for form data
    if (!form.title || !form.description || !form.start || !form.end) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Event added successfully:", result);
      fetchEvents();
      setForm({ id: "", title: "", description: "", start: "", end: "" });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding event:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Simple Schedule</h1>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
          <Calendar
            value={selectedDate}
            onChange={(value) => handleDateChange(value as Date | [Date, Date])}
            className="w-full calendar-custom"
          />
          <form className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Title"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
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
              className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              Add Event
            </button>
          </form>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">Scheduled Events</h2>
          <ul className="divide-y divide-gray-200">
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.id} className="py-2">
                  <p className="font-semibold text-purple-800">{event.title}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(event.start).toLocaleString()} to {new Date(event.end).toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">{event.description}</p>
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
