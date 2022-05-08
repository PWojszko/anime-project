import React, { useEffect, useState } from "react";

export function Rotator(items: JSX.Element) {
  const [transformValue, setTransformValue] = useState(0);

  const handleClick = (side: string) => {
    const toLeftCondition = side === "toLeft" && transformValue < 0;
    const toRightCondition = side === "toRight";

    if (toLeftCondition) {
      setTransformValue((prev) => prev + 100);
    } else if (toRightCondition) {
      setTransformValue((prev) => prev - 100);
    }
  };

  useEffect(() => {
    const itemList = document.querySelectorAll<HTMLElement>(
      ".rotator__list > div"
    );
    itemList.forEach((element) => {
      element.style.transform = `translate(${transformValue}%, 0)`;
    });
  }, [transformValue]);

  return (
    <div className="rotator">
      <button
        className="rotator__button rotator__button-to-left button"
        name="left"
        onClick={() => handleClick("toLeft")}
      >
        To left
      </button>

      <div className="rotator__list">{items}</div>

      <button
        className="rotator__button rotator__button-to-right button"
        name="left"
        onClick={() => handleClick("toRight")}
      >
        To right
      </button>
    </div>
  );
}
