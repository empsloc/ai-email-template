"use client"
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import Prompt from '@/Data/Prompt'
import axios from 'axios'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid';
import { useUserDetail } from '@/app/provider'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Description } from '@radix-ui/react-dialog'

function AIInputBox() {
  const [userInput,setUserInput] = useState<any>("")
  const [loading,setLoading] = useState<any>(false)
  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate)
  const {userDetail,setUserDetail} = useUserDetail()
  const router = useRouter()

  const onGenerate=async ()=>{
    const tid=uuidv4()
    const PROMPT = Prompt.EMAIL_PROMPT+"\n-"+userInput
    setLoading(true)
    try {
        console.log(PROMPT)
        const result = await axios.post("/api/ai-email-generate",{
            prompt:PROMPT,
           
        })
        console.log(result.data)
        //save data in db
           const resp= await SaveTemplate({
                tid:tid,
                design:result.data,
                email:userDetail?.email,
                description:userInput
            })
            console.log(resp)
            //navigate user to editor page
            router.push("/editor/"+tid)
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  }


  return (
    <div className='mt-5 '>
        <p className='mb-2'>Provide details about the email template you'd like to create</p>
        <Textarea placeholder='Start writing here' onChange={(e)=>setUserInput(e.target.value)} rows={20} className='text-xl h-52 row-end-9 resize-none'/>
        <Button onClick={onGenerate} disabled={(userInput?.length==0||loading)} className='w-full mt-7 cursor-pointer'>{loading?<span className='flex gap-2'><Loader2 className='animate-spin'/> Please wait ...</span>:"Generate"}</Button>
    </div>
  )
}

export default AIInputBox