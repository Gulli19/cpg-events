import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // importa lo stile di react-calendar

const events = [
  {
    id: 1,
    name: "Evento Live 1",
    start: new Date("2025-08-05T15:00:00"),
    end: new Date("2025-08-05T16:00:00"),
    isLive: true,
  },
  {
    id: 2,
    name: "Evento Futuro 1",
    start: new Date("2025-08-10T18:00:00"),
    end: new Date("2025-08-10T20:00:00"),
    isLive: false,
  },
];

function LiveNow({ events, onJoin }) {
  const liveEvents = events.filter(e => e.isLive);

  if (liveEvents.length === 0)
    return <p className="text-gray-400 mt-4">Non ci sono eventi live al momento.</p>;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-xl font-bold">Eventi Live</h3>
      <ul>
        {liveEvents.map(event => (
          <li key={event.id} className="flex justify-between items-center bg-gray-800 p-2 rounded mb-2">
            <span>{event.name} - {event.start.toLocaleTimeString()}</span>
            <button
              onClick={() => onJoin(event)}
              className="bg-lime-400 text-black py-1 px-3 rounded hover:bg-lime-300 font-semibold"
            >
              Join Event
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function JoinEventForm({ event, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Registrato a evento:", event.id, { name, email });
    setSubmitted(true);
  }

  if (submitted)
    return (
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <p className="text-lime-400">Grazie per esserti registrato a {event.name}!</p>
        <button
          onClick={onClose}
          className="mt-2 bg-[#9f65ff] hover:bg-purple-400 text-white py-1 px-3 rounded font-semibold"
        >
          Chiudi
        </button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-800 p-4 rounded space-y-3">
      <h3 className="text-xl font-bold mb-2">Registrazione per {event.name}</h3>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-lime-400 text-black py-2 px-4 rounded hover:bg-lime-300 font-semibold"
        >
          Registrati
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold"
        >
          Annulla
        </button>
      </div>
    </form>
  );
}

function ViewEvents({ events }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredEvents = events.filter(e =>
    e.start.toDateString() === selectedDate.toDateString() && !e.isLive
  );

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Calendario Eventi</h3>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <div className="mt-4">
        <h4 className="font-semibold">
          Eventi il {selectedDate.toLocaleDateString()}
        </h4>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-400">Nessun evento in questa data.</p>
        ) : (
          <ul className="list-disc ml-5 mt-2">
            {filteredEvents.map(e => (
              <li key={e.id}>
                {e.name} - {e.start.toLocaleTimeString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState(null); // null, "live", "calendar"
  const [joinEvent, setJoinEvent] = useState(null);

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-2">ClubPartyGames</h1>
      <h2 className="text-5xl font-extrabold text-[#9f65ff] mb-4">CPG EVENTS</h2>
      <p className="text-lime-400 mb-8 tracking-wider">JOIN. FRAG. CELEBRATE.</p>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => setView("live")}
          className="bg-lime-400 text-black py-2 px-4 rounded hover:bg-lime-300 font-semibold"
        >
          Live Now
        </button>

        <button
          onClick={() => joinEvent && setJoinEvent(joinEvent)} // solo placeholder, Join Event è dentro LiveNow
          className="bg-lime-400 text-black py-2 px-4 rounded opacity-50 cursor-not-allowed font-semibold"
          disabled
          title="Usa 'Join Event' dentro 'Live Now'"
        >
          Join Event
        </button>

        <button
          onClick={() => setView("calendar")}
          className="bg-[#9f65ff] hover:bg-purple-400 text-white py-2 px-4 rounded font-semibold"
        >
          View Events
        </button>
      </div>

      {view === "live" && <LiveNow events={events} onJoin={setJoinEvent} />}
      {view === "calendar" && <ViewEvents events={events} />}
      {joinEvent && <JoinEventForm event={joinEvent} onClose={() => setJoinEvent(null)} />}
    </div>
  );
}

export default App;
