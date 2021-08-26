import React, { HTMLAttributes } from "react";

const FormField: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`form__field ${className}`} {...props}>
    {children}
  </div>
);

export default FormField;
