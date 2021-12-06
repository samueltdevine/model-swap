import React from "react";

const checkAnimation = (event, answer, value) => {
  const target = event.target;
  const parent = target.parentNode;
  if (answer === value) {
    parent.className = "right";
  } else {
    parent.className = "wrong";
    setTimeout(() => {
      parent.className = "";
      console.log("wrong!");
    }, 200);
  }
};

const GuiQuestion = (props, children) => {
  const { activeNum, setActiveNum, answer } = props;
  return (
    <div
      className="gui-body"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>{props.children}</h1>
      <label>
        <input
          type="radio"
          name="1"
          value={1}
          checked={activeNum === 1}
          onChange={(event) => {
            checkAnimation(event, answer, 1);
            setActiveNum(1);
          }}
        />
        1
      </label>
      <label>
        <input
          type="radio"
          name="2"
          value={2}
          checked={activeNum === 2}
          onChange={(event) => {
            checkAnimation(event, answer, 2);
            setActiveNum(2);
          }}
        />
        2
      </label>
      <label>
        <input
          type="radio"
          name="3"
          value={3}
          checked={activeNum === 3}
          onChange={(event) => {
            checkAnimation(event, answer, 3);
            setActiveNum(3);
          }}
        />
        3
      </label>
    </div>
  );
};

export default GuiQuestion;
