import React, { ButtonHTMLAttributes } from "react";

type Appearance = "default" | "primary" | "success";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: Appearance;
}

function getClassForAppearance(appearance: Appearance): string {
  switch (appearance) {
    case "primary":
      return "btn__primary";
    case "success":
      return "btn__success";
    default:
      return "";
  }
}

const Button: React.FC<Props> = ({
  appearance = "default",
  className = "",
  children,
  ...props
}) => {
  const appearanceClass = getClassForAppearance(appearance);

  return (
    <button className={`btn ${appearanceClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
