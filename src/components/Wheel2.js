import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index.css";

const Wheel = () => {
  let { id } = useParams();
  const [segment, setSegment] = useState([]);
  const [segColor, setSegColor] = useState([]);

  const getEventPrizeRandom = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/api/v1/play/events/" +
          id +
          "/event-prize-random"
      );

      let lists = [];

      for (let i = 0; i < response.data.eventPrizeRandom.length; i++) {
        lists.push(
          process.env.REACT_APP_API_URL +
            "/uploads/image/" +
            response.data.eventPrizeRandom[i].prize.image
        );
      }

      let colors = [];

      for (let i = 0; i < response.data.eventPrizeRandom.length; i++) {
        colors.push(response.data.eventPrizeRandom[i].color);
      }

      setSegment(lists);
      setSegColor(colors);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getEventPrizeRandom();
  }, []);

  console.log({ segment, segColor });

  const onFinished = (winner) => {
    console.log(winner);
  };

  let wheel = null;
  if (segment.length !== 0 && segColor.length !== 0) {
    wheel = (
      <WheelComponent
        segments={segment}
        segColors={segColor}
        winningSegment="won 10"
        onFinished={(winner) => onFinished(winner)}
        primaryColor="orange"
        contrastColor="yellow"
        buttonText="กด!"
        isOnlyOnce={false}
        size={250}
        upDuration={100}
        downDuration={1000}
      />
    );
  }
  return <div className="flex justify-center">{wheel}</div>;
};

export default Wheel;
