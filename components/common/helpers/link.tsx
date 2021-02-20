import React from "react";

const Link = React.forwardRef<HTMLInputElement, any>((props, ref: any) => (
  <a ref={ref} {...props}>
    {props.children}
  </a>
));

export default Link;
