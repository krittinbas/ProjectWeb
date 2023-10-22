import React, { useState, useEffect } from 'react';
import './DoorControl.css';
import { url_myAPI } from '../config';
import PllageK from './pageK';
const DoorControl = () => {
  const [key, setKey] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // อัพเดตเวลาทุกๆ วินาที
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      fetch(url_myAPI + "info?user=cGV0ZXJAcGV0ZXIuY29t")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.key)
          setKey(data.key)
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
        });
    }, 1000);

    // ทำความสะอาด interval เมื่อคอมโพเนนต์ถูกถอด
    return () => clearInterval(intervalId);
  }, [setKey,key]);
  return (
    <div className='appDas DOOR-body'>
      <p className="digital-clock">
        {currentTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })}
      </p>
      {Object.keys(key).map((keyId, index) => (
        <PllageK codekey={key[keyId].codeKey} nickname = {key[keyId].nickname} keyState = {key[keyId].statekey}/>
      ))}

    </div>
  );
};

export default DoorControl;
