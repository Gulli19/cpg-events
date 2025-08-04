import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-[#1e1e2e] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-2">ClubPartyGames</h1>
      <h2 className="text-5xl font-extrabold text-[#9f65ff] mb-4">CPG EVENTS</h2>
      <p className="text-lime-400 mb-8 tracking-wider">JOIN. FRAG. CELEBRATE.</p>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button className="bg-lime-400 text-black py-2 px-4 rounded hover:bg-lime-300 font-semibold">
          Join Event
        </button>
        <div className="text-gray-400 text-center text-sm">LIVE NOW</div>
        <button className="bg-[#9f65ff] hover:bg-purple-400 text-white py-2 px-4 rounded font-semibold">
          View Events
        </button>
      </div>
    </div>
  );
}

export default App;