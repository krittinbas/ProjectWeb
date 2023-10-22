import React, { useState, useEffect } from 'react';
import './DoorControl.css';

const DoorControl = () => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // อัพเดตเวลาทุกๆ วินาที
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // ทำความสะอาด interval เมื่อคอมโพเนนต์ถูกถอด
    return () => clearInterval(intervalId);
  }, []);
  
  const toggleDoor = () => {
    if (!isLoading) {
      setIsLoading(true);
      // Simulate API call to toggle the door status
      simulateApiCall(!isDoorOpen);
    }
  };

  const simulateApiCall = (newState) => {
    // Simulate API call (replace this with actual API call)
    // If newState is not provided, assume it's fetching the current state
    const endpoint = newState ? 'open' : 'close'; // Adjust endpoint accordingly
    fetch(`your-api-endpoint/${endpoint}`, {
      method: 'POST', // or 'PUT' or 'PATCH' depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isOpen: newState }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsDoorOpen(data.isOpen);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  return (
    
    <div className="door-control-container">
    <div className="clock-container">
        <p className="digital-clock">
          {currentTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </p>
      </div>
      <h1 className="door-control-title">ระบบควบคุมประตู</h1>
      <button
        className={`door-control-button ${isDoorOpen ? 'open' : 'close'}`}
        onClick={toggleDoor}
      >
        {isLoading ? 'กำลังประมวลผล...' : isDoorOpen ? 'เปิด' : 'ปิด'}
      </button>
      <p className="door-status">สถานะ: {isDoorOpen ? 'เปิด' : 'ปิด'}</p>
    </div>
  );
};

export default DoorControl;
