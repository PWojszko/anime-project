import React, { useEffect, useState } from "react";

import { useRWDContext } from "../contexts/RWDContext";

export function Rotator(
  items: JSX.Element,
  itemsOnScreen: number,
  itemsOnScreenSm: number,
  itemsOnScreenMd: number,
  itemsOnScreenLg: number
) {
  const { sm, md, lg } = useRWDContext();

  const [scrollCounter, setScrollCounter] = useState(0);
  const [elementsQty, setElementsQty] = useState(0);
  const [elementsOnScreen, setElementsOnScreen] = useState(itemsOnScreenSm);
  const [elementWidth, setElementWidth] = useState(0);

  const itemList = document.querySelectorAll<HTMLElement>(
    ".rotator__list > div"
  );
  const itemListContainer =
    document.querySelector<HTMLElement>(".rotator__list");
  const maxSwipeRight = elementsQty - elementsOnScreen;

  // RWD
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
  }, [
    itemList,
    itemsOnScreen,
    itemsOnScreenLg,
    itemsOnScreenMd,
    itemsOnScreenSm,
    lg.matches,
    md.matches,
    sm.matches,
  ]);

  // Position reset on sreen size change
  useEffect(() => {
    setScrollCounter(0);
  }, [sm, md, lg]);

  // Move mechanism
  useEffect(() => {
    itemList.forEach((element) => {
      setElementWidth(element.offsetWidth);
      element.style.width = `${100 / elementsOnScreen}%`;
    });

    if (itemListContainer) {
      itemListContainer.style.transform = `translate(${
        scrollCounter * elementWidth
      }px, 0)`;
    }
  }, [scrollCounter, itemList, elementsOnScreen]);

  const swipeMechanism = (side: string) => {
    const toLeftCondition = side === "left" && scrollCounter < 0;
    const toRightCondition = side === "right" && scrollCounter > -maxSwipeRight;

    if (toLeftCondition) {
      setScrollCounter((prev) => prev + 1);
    } else if (toRightCondition) {
      setScrollCounter((prev) => prev - 1);
    }
  };

  //Draggable scroll
  const [mousePosition, setMousePosition] = useState(0);
  const [swipeValue, setSwipeValue] = useState(0);

  useEffect(() => {
    if (swipeValue < 0) {
      swipeMechanism("left");
    } else if (swipeValue > 0) {
      swipeMechanism("right");
    }
  }, [swipeValue]);

  interface draggableScrollInferface {
    preventDefault: () => void;
    clientX: number;
  }

  const handleOnMouseDown = (e: draggableScrollInferface) => {
    e.preventDefault();
    setMousePosition(e.clientX);
  };
  const handleOnMouseUp = (e: draggableScrollInferface) => {
    e.preventDefault();
    const mouseMovePosition = mousePosition - e.clientX;
    setSwipeValue(mouseMovePosition);
  };

  const handleClick = (side: string) => {
    swipeMechanism(side);
  };

  const button = (direction: string) => {
    if (elementsQty < elementsOnScreen) return;

    const swipeLeftCondition = direction === "left" && scrollCounter < 0;
    const swipeRightCondition =
      direction === "right" && scrollCounter > -maxSwipeRight;
    const isActive = swipeLeftCondition || swipeRightCondition;
    const activeClassName = isActive ? "active" : "inactive";

    return (
      <button
        className={`rotator__button rotator__button--${activeClassName} rotator__button-to-${direction} button`}
        onClick={() => handleClick(direction)}
      >
        <div
          className={`rotator__button-lines rotator-button-lines--${direction}`}
        >
          <div className="rotator__button-line rotator__button-line-1"></div>
          <div className="rotator__button-line rotator__button-line-2"></div>
          <div className="rotator__button-line rotator__button-line-3"></div>
          <div className="rotator__button-line rotator__button-line-4"></div>
        </div>
      </button>
    );
  };

  return (
    <div className="rotator">
      {button("left")}
      <div
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        className="rotator__list"
      >
        {items}
      </div>
      {button("right")}
    </div>
  );
}
