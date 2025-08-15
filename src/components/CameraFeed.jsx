import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function CameraFeed({ onMoodChange }) {
  const videoRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      setLoading(false);
      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera error: ", err));
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const mood = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
        onMoodChange(mood);
      }
    }, 2000); // check every 2s
  };

  return (
    <div className="flex flex-col items-center">
      {loading && <p>Loading AI Models...</p>}
      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoPlay}
        className="w-[500px] rounded-lg border"
      />
    </div>
  );
}
