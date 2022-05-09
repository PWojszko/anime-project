import React, { useEffect, useState } from "react";

export function Rotator(items: JSX.Element, itemsOnScreen: number) {
  const [transformValue, setTransformValue] = useState(0);
  const [elementsQty, setElementsQty] = useState(0);
  const [elementsOnScreen, setElementsOnScreen] = useState(itemsOnScreen);

  const itemList = document.querySelectorAll<HTMLElement>(
    ".rotator__list > div"
  );

  useEffect(() => {
    itemList.forEach((element) => {
      element.style.transform = `translate(${transformValue}%, 0)`;
    });

    setElementsOnScreen(4);
    setElementsQty(itemList.length);
  }, [itemList, transformValue]);

  const handleClick = (side: string) => {
    const maxToRight = elementsQty - elementsOnScreen;

    const toLeftCondition = side === "left" && transformValue < 0;
    const toRightCondition = side === "right" && transformValue > -maxToRight;

    if (toLeftCondition) {
      setTransformValue((prev) => prev + 100);
    } else if (toRightCondition) {
      setTransformValue((prev) => prev - 100);
    }
  };

  const button = (direction: string) => {
    return (
      <button
        className={`rotator__button rotator__button-to-${direction} button`}
        onClick={() => handleClick(direction)}
      >
        To left
      </button>
    );
  };

  return (
    <div className="rotator">
      {elementsQty > elementsOnScreen ? button("left") : null}
      <div className="rotator__list">{items}</div>
      {elementsQty > elementsOnScreen ? button("right") : null}
    </div>
  );
}
