import React from 'react'

function TextComponent({style,content, outerStyle,textarea}:any) {
  return (
   <div style={outerStyle} className='w-full'>
        <h2 style={style}>{content} {textarea}</h2>
        </div>
    
  )
}

export default TextComponent