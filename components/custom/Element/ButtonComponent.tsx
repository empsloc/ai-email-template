import { Button } from "@/components/ui/button";
import React from "react";

function ButtonComponent({ style, content, url, outerStyle }: any) {
  return (
    <button  style={outerStyle}>
      <a href={url}  style={style}>{content}</a>
    </button>
  );
}

export default ButtonComponent;
