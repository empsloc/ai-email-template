import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
  
import React from "react";

function ToggleGroupField({ label, value,options, onHandleStyleChange }: any) {
  return (
    <div>
      <label>{label}</label>
      <ToggleGroup type="single"
      defaultValue={value}
      className="w-full"
      onValueChange={(v)=>onHandleStyleChange(v)}
      >
        
        {options.map((option:any,index:any)=>(
            <ToggleGroupItem key={index} className="w-full" value={option.value}>{<option.icon/>}</ToggleGroupItem>
        ))}
        
        
      </ToggleGroup>
    </div>
  );
}

export default ToggleGroupField;
