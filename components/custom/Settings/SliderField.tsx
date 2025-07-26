
import { Slider } from '@/components/ui/slider'
import React from 'react'

function SliderField({label,value,onHandleStyleChange,type="px"}:any) {
    const FormattedValue=(value:any)=>{
        return Number(value.toString().replace(type,""))
    }
  return (
    <div className='grid  gap-2'>
        <label>{label} ({value})</label>
        <Slider onValueChange={(v)=>onHandleStyleChange(v+type)} defaultValue={[FormattedValue(value)]} max={100} step={1} />
    </div>
  )
}

export default SliderField