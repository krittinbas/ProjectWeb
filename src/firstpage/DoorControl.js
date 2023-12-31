import React, { useState, useEffect } from 'react';
import './DoorControl.css';
import { url_myAPI } from '../config';
import PllageK from './pageK';
import SidebarDisplay from '../Sidebar/SidebarDisplay';

const DoorControl = () => {
  const [key, setKey] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // อัพเดตเวลาทุกๆ วินาที
    const user = localStorage.getItem("username");
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      fetch(url_myAPI + "info?user=" + user)
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
    return () => clearInterval(intervalId);
  }, [setKey, key]);


  return (
    <div>
      <SidebarDisplay />
      <div className='DOOR-body'>

        <p className="digital-clock">
          {currentTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </p>
        <div className='asd'>
          {Object.keys(key).map((keyId, index) => (
            <PllageK codekey={key[keyId].codeKey} nickname={key[keyId].nickname} keyState={key[keyId].statekey} />
          ))}
        </div>
      </div>
    </div>

  );
};

export default DoorControl;
