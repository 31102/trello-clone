import React from "react";
import { Line } from "react-progressbar";

const Line: React.FC = () => {
  const progress = 40; // Set your progress value here (between 0 and 100)

  return (
    <div>
      <h1>Your Progress</h1>
      <Line
        progress={progress / 100} // Convert the progress to a value between 0 and 1
        height={10} // Set the height of the progress bar
        color="#32CD32" // Set the color of the progress bar
        bgColor="#f8f8f8" // Set the background color of the progress bar
        borderRadius={5} // Set the border radius of the progress bar
      />
      <p>{`${progress}% Complete`}</p>
    </div>
  );
};

export default Line;
