"use client"
import { useEmailTemplate, useUserDetail } from '@/app/provider'
import Canvas from '@/components/custom/Canvas'
import EditorHeader from '@/components/custom/EditorHeader'
import ElementsSideBar from '@/components/custom/ElementsSideBar'
import Settings from '@/components/custom/Settings'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'

function  Editor() {
  const [viewHTMLCode,setViewHTMLCode] = useState<any>()
  const {templateId} = useParams<any>()
  const {userDetail,setUserDetail}  = useUserDetail()
  const [loading,setLoading] = useState<any>(false)
  const {emailTemplate,setEmailTemplate} = useEmailTemplate()
  const convex = useConvex()

  useEffect(()=>{
    if(userDetail){
      GetTemplateData()
    }
  },[userDetail])
  const GetTemplateData=async()=>{
    setLoading(true)
    const result = await convex.query(api.emailTemplate.GetTemplateDesign,{
      tid:templateId,
      email:userDetail?.email

    })

    console.log(result)
    if(result){
      setEmailTemplate(result?.design)
    }
    
    setLoading(false)
  }
  return (
    <div> 
        <EditorHeader viewHTMLCode={(v:any)=>setViewHTMLCode(v)}/>
        {!loading?<div className='grid grid-cols-5 '>
            <ElementsSideBar/>
            <div className='col-span-3 bg-gray-100'>
                <Canvas closeDialog={()=>setViewHTMLCode(false)} viewHTMLCode = {viewHTMLCode}/>
            </div>
            <Settings/>
            
        </div>:<div>Please wait ...</div>}
    </div>
  )
}

export default  Editor