import React from "react";

interface SlidingButtonInterface {
  buttonClass?: string;
  firstText?: string;
  secondText?: string;
  onClick?: () => void;
}

const SlidingButton = ({
  buttonClass,
  firstText,
  secondText,
  onClick,
}: SlidingButtonInterface) => {
  const buttonClassName = buttonClass ? buttonClass : "button";

  const titleClass = buttonClass
    ? `button__title ${buttonClass}__title`
    : `button__title`;

  const subtitleClass = buttonClass
    ? `button__subtitle ${buttonClass}__title`
    : `button__subtitle`;

  return (
    <button onClick={onClick} className={buttonClassName}>
      <span className={titleClass}>{firstText}</span>
      <span className={subtitleClass}>{secondText}</span>
    </button>
  );
};

export default SlidingButton;
