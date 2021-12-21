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
  const {
    activeIntakeNum,
    setActiveIntakeNum,
    activeExhaustNum,
    setActiveExhaustNum,
    setAtticNum,
    atticNum,
    answer,
    type,
    names,
    setActivePreview,
    atticMode,
    // forwardedRef,
  } = props;
  let activeNum = 0;
  let setActiveNum = undefined;

  if (type === "exhaust") {
    activeNum = activeExhaustNum;
  } else {
    activeNum = activeIntakeNum;
  }
  if (type === "exhaust") {
    setActiveNum = setActiveExhaustNum;
  } else {
    setActiveNum = setActiveIntakeNum;
  }
  if (type === "attic") {
    activeNum = atticNum;
    setActiveNum = setAtticNum;
  }
  return (
    <div
      // style={{ borderRight: "1px solid #dee2e6" }}
      className="gui-body"
      // style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>{props.children}</h1>

      <label
        // onPointerOver={(e) => console.log("hit1")}
        onClick={(e) => setActivePreview([1, type])}
      >
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
        {names[0]}
      </label>
      <label onClick={(e) => setActivePreview([2, type])}>
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
        {names[1]}
      </label>
      <label onClick={(e) => setActivePreview([3, type])}>
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
        {names[2]}
      </label>
      {atticMode === false && (
        <>
          <label onClick={(e) => setActivePreview([4, type])}>
            <input
              type="radio"
              name="4"
              value={4}
              checked={activeNum === 4}
              onChange={(event) => {
                checkAnimation(event, answer, 4);
                setActiveNum(4);
              }}
            />
            {names[3]}
          </label>

          <label onClick={(e) => setActivePreview([5, type])}>
            <input
              type="radio"
              name="5"
              value={5}
              checked={activeNum === 5}
              onChange={(event) => {
                checkAnimation(event, answer, 5);
                setActiveNum(5);
              }}
            />
            {names[4]}
          </label>
          <label onClick={(e) => setActivePreview([6, type])}>
            <input
              type="radio"
              name="6"
              value={6}
              checked={activeNum === 6}
              onChange={(event) => {
                checkAnimation(event, answer, 6);
                setActiveNum(6);
              }}
            />
            {names[5]}
          </label>
          <label
            // onPointerOver={(e) => console.log("hit1")}
            onClick={(e) => setActivePreview([0, type])}
          >
            <input
              type="radio"
              name="None"
              value={0}
              checked={activeNum === 0}
              onChange={(event) => {
                checkAnimation(event, answer, 0);
                setActiveNum(null);
              }}
            />
            none
          </label>
        </>
      )}
    </div>
  );
};

export default GuiQuestion;
