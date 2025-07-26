import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
function DropdownField({value,label,options,onHandleStyleChange}:any) {
  return (
    <div>
        <label>{label}</label>
        <Select onValueChange={(v)=>onHandleStyleChange(v)} defaultValue={value}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder={value} />
  </SelectTrigger>
  <SelectContent>
    {options.map((option:any,index:any)=>(
    <SelectItem key={index} value={option}>{option}</SelectItem>

    ))}
    
  </SelectContent>
</Select>

    </div>
  )
}

export default DropdownField