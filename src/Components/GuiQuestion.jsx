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
    setActiveNum = setActiveExhaustNum;
  } else if (type === "attic") {
    activeNum = atticNum;
    setActiveNum = setAtticNum;
  } else if (type === "intake") {
    activeNum = activeIntakeNum;
    setActiveNum = setActiveIntakeNum;
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
      {atticMode === false && (
        <>
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
          <label onClick={(e) => setActivePreview([7, type])}>
            <input
              type="radio"
              name="7"
              value={7}
              checked={activeNum === 7}
              onChange={(event) => {
                checkAnimation(event, answer, 7);
                setActiveNum(7);
              }}
            />
            {names[6]}
          </label>
          <label onClick={(e) => setActivePreview([8, type])}>
            <input
              type="radio"
              name="8"
              value={8}
              checked={activeNum === 8}
              onChange={(event) => {
                checkAnimation(event, answer, 8);
                setActiveNum(8);
              }}
            />
            {names[7]}
          </label>
          <label onClick={(e) => setActivePreview([9, type])}>
            <input
              type="radio"
              name="9"
              value={9}
              checked={activeNum === 9}
              onChange={(event) => {
                checkAnimation(event, answer, 9);
                setActiveNum(9);
              }}
            />
            {names[8]}
          </label>
          <label onClick={(e) => setActivePreview([10, type])}>
            <input
              type="radio"
              name="10"
              value={10}
              checked={activeNum === 10}
              onChange={(event) => {
                checkAnimation(event, answer, 10);
                setActiveNum(10);
              }}
            />
            {names[9]}
          </label>
          <label onClick={(e) => setActivePreview([11, type])}>
            <input
              type="radio"
              name="11"
              value={11}
              checked={activeNum === 11}
              onChange={(event) => {
                checkAnimation(event, answer, 11);
                setActiveNum(11);
              }}
            />
            {names[10]}
          </label>
          <label onClick={(e) => setActivePreview([12, type])}>
            <input
              type="radio"
              name="12"
              value={12}
              checked={activeNum === 12}
              onChange={(event) => {
                checkAnimation(event, answer, 12);
                setActiveNum(12);
              }}
            />
            {names[11]}
          </label>
          <label onClick={(e) => setActivePreview([13, type])}>
            <input
              type="radio"
              name="13"
              value={13}
              checked={activeNum === 13}
              onChange={(event) => {
                checkAnimation(event, answer, 13);
                setActiveNum(13);
              }}
            />
            {names[12]}
          </label>
          <label onClick={(e) => setActivePreview([14, type])}>
            <input
              type="radio"
              name="14"
              value={14}
              checked={activeNum === 14}
              onChange={(event) => {
                checkAnimation(event, answer, 14);
                setActiveNum(14);
              }}
            />
            {names[13]}
          </label>
          <label onClick={(e) => setActivePreview([15, type])}>
            <input
              type="radio"
              name="15"
              value={15}
              checked={activeNum === 15}
              onChange={(event) => {
                checkAnimation(event, answer, 15);
                setActiveNum(15);
              }}
            />
            {names[14]}
          </label>
          <label onClick={(e) => setActivePreview([16, type])}>
            <input
              type="radio"
              name="16"
              value={16}
              checked={activeNum === 16}
              onChange={(event) => {
                checkAnimation(event, answer, 16);
                setActiveNum(16);
              }}
            />
            {names[15]}
          </label>
          <label onClick={(e) => setActivePreview([17, type])}>
            <input
              type="radio"
              name="17"
              value={17}
              checked={activeNum === 17}
              onChange={(event) => {
                checkAnimation(event, answer, 17);
                setActiveNum(17);
              }}
            />
            {names[16]}
          </label>
          <label onClick={(e) => setActivePreview([18, type])}>
            <input
              type="radio"
              name="18"
              value={18}
              checked={activeNum === 18}
              onChange={(event) => {
                checkAnimation(event, answer, 18);
                setActiveNum(18);
              }}
            />
            {names[17]}
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
