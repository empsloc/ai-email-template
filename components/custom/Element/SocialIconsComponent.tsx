import React from 'react'

function SocialIconsComponent({socialIcons,style,outerStyle}:any) {
  return (
    <div style={outerStyle}>
        {socialIcons.map((icon:any,index:any)=>(
            <img key={index} src={icon.url} style={style} alt='socialIcon'/>
            // <>{icon.url}</>
        ))}
    </div>
  )
}

export default SocialIconsComponent