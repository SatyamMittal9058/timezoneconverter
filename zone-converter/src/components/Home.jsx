import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import TimeZoneSlider from "./TimeZoneSlider";
import { ThemeContext } from "./context";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Home() {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [timezones, setTimezones] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState([]);
  const { toggle, toggletheme } = useContext(ThemeContext);
  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setValue(inputValue);
    if (inputValue.length > 1) {
      let searchResults;
      if (inputValue.includes("india") || inputValue.includes("ist")) {
        searchResults = ["Asia/Kolkata"];
      } else {
        searchResults = moment.tz
          .names()
          .filter((name) => name.toLowerCase().includes(inputValue));
      }
      const matchedTimezones = searchResults.map((name) => {
        return {
          name: name,
          time: moment.tz(name).format("hh:mm:ss A"),
        };
      });
      setTimezones(matchedTimezones);
      setOpenList(true);
    } else {
      setTimezones([]);
      setOpenList(false);
    }
  };

  const handleSelectTimezone = (timezone) => {
    setSelectedTimezone((currentTimezones) => [
      ...currentTimezones,
      { [timezone.name]: timezone.time },
    ]);
    setValue(`${timezone.name} - ${timezone.time}`);
    setOpenList(false);
    setValue("");
  };
  const [reverseOn, setReverseOn] = useState(false);
  const onDragEnd = (result) => {
    if (!result.destination) {
        return;
    }

    const items = Array.from(selectedTimezone);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedTimezone(items);
};

  const removeTimezone = (value) => {
    const updatedTimezones = selectedTimezone.filter(
      (timezone) => Object.keys(timezone)[0] !== value
    );
    setSelectedTimezone(updatedTimezones);
  };
  useEffect(() => {
    const UTCtime = moment().tz("UTC").format("hh:mm A");
    const ISTtime = moment().tz("Asia/Kolkata").format("hh:mm A");
    setSelectedTimezone((currentTimezones) => [
      ...currentTimezones,
      { UTC: UTCtime },
      { IST: ISTtime },
    ]);
  }, []);

  return (
    <>
      <div className="w-full md:w-1/2 m-auto border-2 py-2 px-2 my-1">
        <div className="flex gap-8">
          <div className="flex w-auto gap-2">
            <input
              ref={inputRef}
              className="border-2 px-1"
              placeholder="Enter Timezone"
              type="text"
              value={value}
              onChange={handleInputChange}
            />
            <button
              className="ring ring-inset px-2 font-bold text-lg text-center"
              onClick={() => inputRef.current.focus()}
            >
              +
            </button>
          </div>
          <div className="space-x-2 font-bold text-xl">
            <button
              className="border-2 px-1"
              onClick={() => setReverseOn(false)}
            >
              &uarr;
            </button>
            <button
              className="border-2 px-1"
              onClick={() => setReverseOn(true)}
            >
              &darr;
            </button>
          </div>
          <div>
            <button className="text-xl" onClick={toggletheme}>
              {toggle ? <>&#127770;</> : <>&#127765;</>}
            </button>
          </div>
        </div>
        {openList && (
          <div className="relative">
            {" "}
            {/* Ensure dropdown is positioned relatively to a positioned ancestor */}
            <div className="max-h-32 overflow-auto mt-1 border border-gray-300 rounded-lg bg-white z-50 absolute w-full">
              <ul>
                {timezones?.map((timezone, id) => {
                  return (
                    <li
                      key={id}
                      className="cursor-pointer"
                      onClick={() => handleSelectTimezone(timezone)}
                    >
                      <div className="px-4 py-2">
                        {timezone?.name} - {timezone?.time}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        {reverseOn
          ? [...selectedTimezone]
              .reverse()
              .map((timezone, id) => (
                <TimeZoneSlider
                  key={id}
                  timezone={timezone}
                  onRemove={() => removeTimezone(Object.keys(timezone)[0])}
                />
              ))
          : selectedTimezone.map((timezone, id) => (
              <TimeZoneSlider
                key={id}
                timezone={timezone}
                onRemove={() => removeTimezone(Object.keys(timezone)[0])}
              />
            ))}
      </div>
    </>
  );
}

export default Home;