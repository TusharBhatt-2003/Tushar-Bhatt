import React from 'react';
import Location from '../../assets/logos/location';

const LocationInfo = ({ textColor }) => {
  return (
    <div className="md:ml-10 flex flex-col justify-center items-center font-thin lg:items-start text-sm lg:text-xl">
      <p className="flex justify-center items-center">
        Faridabad, Haryana. <Location color={textColor} size="20" />
      </p>
      <p>INDIA</p>
    </div>
  );
};

export default LocationInfo;
