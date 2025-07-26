"use client";
import {
  useDragElementLayout,
  useEmailTemplate,
  useScreenSize,
} from "@/app/provider";
import React, { useEffect, useRef, useState } from "react";
import ColumnLayout from "../LayoutElements/ColumnLayout";
import ViewHtmlDialog from "./ViewHtmlDialog";

function Canvas({viewHTMLCode,closeDialog}:any) {
  const htmlRef = useRef<any>(null)
  const [dragOver, setDragOver] = useState<any>(false);
  const { screenSize, setScreenSize } = useScreenSize();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [htmlCode,setHtmlCode] = useState<any>()

  const onDragOver = (e: any) => {
    e.preventDefault();
    if (!dragOver) setDragOver(true);
    console.log("Over...");
  };

  const onDragLeave = () => {
    setDragOver(false);
  };
  const onDropHandle = () => {
    setDragOver(false);
    console.log(dragElementLayout?.dragLayout);
    if (dragElementLayout?.dragLayout) {
      setEmailTemplate((prev: any) => [...prev, dragElementLayout?.dragLayout]);
    }
  };
  const getLayoutComponent=(layout:any)=>{
    if(layout?.type=="column"){
      return <ColumnLayout layout={layout}/>
    }

  }

  useEffect(()=>{
viewHTMLCode&&GetHTMLCode()
  },[viewHTMLCode])
  const GetHTMLCode=()=>{
    if(htmlRef.current){
      const htmlContent = htmlRef.current.innerHTML;
      console.log(htmlContent)
      setHtmlCode(htmlContent)
    }
  }
  return (
    <div className="mt-20 flex justify-center">
      <div
        onDragOver={onDragOver}
      
        onDrop={() => onDropHandle()}
        className={` p-6 w-full max-w-2xl ${screenSize == "desktop" ? "max-w-2xl" : "max-w-md"} ${dragOver ? "bg-purple-100 p-4":"bg-white"}`}
        ref={htmlRef}
      >
        {emailTemplate?.length>0?emailTemplate?.map((layout:any,index:any)=>(
            <div key={index}>
             {getLayoutComponent(layout)}
            </div>
        )):<h2 className="p-4 text-center bg-gray-100 border border-dashed " >Add Layout  here</h2>}
      </div>
      <ViewHtmlDialog openDialog={viewHTMLCode} closeDialog={closeDialog} htmlCode = {htmlCode}/>
    </div>
  );
}

export default Canvas;
