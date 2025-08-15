import React, { useState } from "react";
import CameraFeed from "./components/CameraFeed";

export default function App() {
  const [mood, setMood] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Face Mood Detector</h1>
      <CameraFeed onMoodChange={setMood} />
      {mood && (
        <p className="mt-4 text-xl">
          Current Mood: <span className="text-yellow-400 font-bold">{mood}</span>
        </p>
      )}
    </div>
  );
}
