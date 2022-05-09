import React, { useEffect, useState, useLayoutEffect } from "react";

import { useRWDContext } from "../contexts/RWDContext";

export function Rotator(
  items: JSX.Element,
  itemsOnScreen: number,
  itemsOnScreenSm: number,
  itemsOnScreenMd: number,
  itemsOnScreenLg: number
) {
  const { sm, md, lg } = useRWDContext();

  const [transformValue, setTransformValue] = useState(0);
  const [elementsQty, setElementsQty] = useState(0);
  const [elementsOnScreen, setElementsOnScreen] = useState(itemsOnScreenSm);

  const itemList = document.querySelectorAll<HTMLElement>(
    ".rotator__list > div"
  );

  useEffect(() => {
    const itemList = document.querySelectorAll<HTMLElement>(
      ".rotator__list > div"
    );
    setElementsQty(itemList.length);

    if (lg.matches) {
      setElementsOnScreen(itemsOnScreenLg);
    } else if (md.matches) {
      setElementsOnScreen(itemsOnScreenMd);
    } else if (sm.matches) {
      setElementsOnScreen(itemsOnScreenSm);
    } else {
      setElementsOnScreen(itemsOnScreen);
    }
  }, [itemList]);

  useEffect(() => {
    itemList.forEach((element) => {
      element.style.transform = `translate(${transformValue}%, 0)`;
      element.style.width = `${100 / elementsOnScreen}%`;
    });
  }, [transformValue, itemList, elementsOnScreen]);

  const handleClick = (side: string) => {
    const maxToRight = elementsQty - elementsOnScreen;

    const toLeftCondition = side === "left" && transformValue < 0;
    const toRightCondition =
      side === "right" && transformValue > -maxToRight * 100;

    //To do - swipe right block on RWD

    if (toLeftCondition) {
      setTransformValue((prev) => prev + 100);
    } else if (toRightCondition) {
      setTransformValue((prev) => prev - 100);
    }
  };

  const button = (direction: string) => {
    if (elementsQty < elementsOnScreen) return;
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
      {button("left")}
      <div className="rotator__list">{items}</div>
      {button("right")}
    </div>
  );
}
