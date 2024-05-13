import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Draggable } from "react-beautiful-dnd";

const timeMarks = [
  { value: 0 * 12, label: "12 AM" }, // Midnight, 0 hours * 12 steps/hour
  { value: 3 * 12, label: "3 AM" }, // Early morning, 3 hours * 12 steps/hour
  { value: 6 * 12, label: "6 AM" }, // Morning, 6 hours * 12 steps/hour
  { value: 9 * 12, label: "9 AM" }, // Late morning, 9 hours * 12 steps/hour
  { value: 12 * 12, label: "12 PM" }, // Noon, 12 hours * 12 steps/hour
  { value: 15 * 12, label: "3 PM" }, // Afternoon, 15 hours * 12 steps/hour
  { value: 18 * 12, label: "6 PM" }, // Evening, 18 hours * 12 steps/hour
  { value: 21 * 12, label: "9 PM" }, // Night, 21 hours * 12 steps/hour
  { value: 24 * 12, label: "" },
];

function TimeZoneSlider({ index, timezone, onRemove }) {
  // console.log(timezone);

  const timezoneName = Object.keys(timezone)[0];
  const time = timezone[timezoneName];

  // convert time to slider value in 5 min scale

  const convertTimeToSliderValue = (time) => {
    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return (hours * 60 + minutes) / 5;
  };

  // default time at starting

  const defaultTimeonScale = Math.round(convertTimeToSliderValue(time));

  const [sliderChange, setSlidderChange] = useState(defaultTimeonScale);

  const calculateTimeFromSlider = (sliderValue) => {
    const totalMinutes = sliderValue * 5;
    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;
  };

  const newtime = calculateTimeFromSlider(sliderChange);

  const handleSliderChange = (event, newValue) => {
    setSlidderChange(newValue);
  };
  return (
    <Draggable draggableId={Object.keys(timezone)[0].toString()} index={index}>
      {(provided) => (
        <div
          className="w-full md:w-1/2 m-auto border-2 px-7 py-1 my-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style, userSelect: "none" }}
          
        >
          <div className="flex justify-between my-2" {...provided.dragHandleProps}>
            <div className="font-medium" >{timezoneName}</div>
            <div className="border-2 border-black px-2">{newtime}</div>
            <button onClick={onRemove}>&#10006;</button>
          </div>
          <Box sx={{ width: "100%" }} className="my-2 text-xs">
            <Slider
              aria-label="Time Zone Slider"
              step={1}
              marks={timeMarks}
              min={0}
              max={287}
              value={sliderChange}
              onChange={handleSliderChange}
              getAriaValueText={() => newtime}
            />
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default TimeZoneSlider;
