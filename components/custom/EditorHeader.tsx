"use client"
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, CodeSquare, Monitor, Smartphone } from "lucide-react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { SaveTemplate } from "@/convex/emailTemplate";
import { toast } from "sonner";

function EditorHeader({viewHTMLCode}:any) {
    const {screenSize, setScreenSize} = useScreenSize()
    const updatedEmailTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign)
    const {templateId} = useParams<any>()
    const {emailTemplate,setEmailTemplate} = useEmailTemplate()
    const onSaveTemplate=async()=>{
      await updatedEmailTemplate({
        tid:templateId,
        design:emailTemplate

      })
      toast("Email template saved successfully")
    }

  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <Image src={"/logo.svg"} alt="logo" width={160} height={150} />
      <div className="flex gap-3">
        <Button onClick={()=>setScreenSize("desktop")} className={`cursor-pointer hover:text-primary ${screenSize=="desktop"&&"bg-purple-100"} `} variant={'ghost'}><Monitor/> Desktop</Button>
        <Button onClick={()=>setScreenSize("mobile")} className={`cursor-pointer hover:text-primary ${screenSize=="mobile"&&"bg-purple-100"} `} variant={'ghost'}><Smartphone/> Mobile</Button>

      </div>
      <div className="flex gap-3">
        <Button className="cursor-pointer hover:text-primary" variant={"ghost"} onClick={()=>viewHTMLCode(true)}>
          <Code />
        </Button>
        <Button variant={"outline"}>Send Test Email</Button>
        <Button className="cursor-pointer" onClick={onSaveTemplate}>Save Template</Button>
      </div>
    </div>
  );
}

export default EditorHeader;
