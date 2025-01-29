import React, { useState } from "react";

const PhotoZoom = ({ src, alt }) => {
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level is 1x
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.5, 3)); // Max zoom level is 3x
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.5, 1)); // Min zoom level is 1x
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setDragging(true);
      setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - start.x,
        y: e.clientY - start.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
    }
  };

  return (
    <div 
      style={{
        overflow: "hidden", // Prevent image from overflowing container
        position: "relative",
        cursor: zoomLevel > 1 ? "grab" : "pointer",
        
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={src}
        alt={alt}
        style={{
          objectFit: "contain", // Keep image aspect ratio
          border: "10px solid black",
          borderRadius: "5px",
          transform: zoomLevel > 1
            ? `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`
            : "none",
          transition: zoomLevel === 1 ? "transform 0.3s ease" : "none",
          cursor: zoomLevel > 1 ? "grab" : "pointer",
          maxWidth: "90%", // Make sure image doesn't exceed the container width
          maxHeight: "100%", // Make sure image doesn't exceed the container height
        }}
        draggable={false}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button onClick={handleZoomIn} style={{ marginBottom: "10px" }}>
          +
        </button>
        <button onClick={handleZoomOut}>-</button>
      </div>
    </div>
  );
};

export default PhotoZoom;
