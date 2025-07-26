"use client";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }: any) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const [userDetail, setUserDetail] = useState<any>();
  const [screenSize, setScreenSize] = useState<any>("desktop");
  const [dragElementLayout, setDragElementLayout] = useState<any>();
  const [emailTemplate, setEmailTemplate] = useState<any>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>()


  useEffect(()=>{
    if(selectedElement){
      let updatedEmailTemplates:any[] = []
       emailTemplate.forEach((item:any,index:any)=>{
        if(item.id===selectedElement?.layout?.id){
            updatedEmailTemplates?.push(selectedElement?.layout)
        }else{
          updatedEmailTemplates.push(item)
        }
    })
    setEmailTemplate(updatedEmailTemplates)
    }
  },[selectedElement])
  useEffect(() => {
    if (typeof window !== undefined && isHydrated) {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate, isHydrated]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userDetail");

      const emailTemplateStorage = localStorage.getItem("emailTemplate");

      if (emailTemplateStorage) {
        try {
          const parsedTemplate = JSON.parse(emailTemplateStorage??{});
          if (Array.isArray(parsedTemplate)) {
            setEmailTemplate(parsedTemplate);
          } else {
            setEmailTemplate([]); // fallback to empty array
          }
        } catch (e) {
          console.error("Invalid JSON in emailTemplate", e);
          setEmailTemplate([]);
        }
      }

      if (!stored) {
        // redirect to home screen
        return;
      }

      try {
        const storage = JSON.parse(stored);
        if (!storage?.email) {
          // redirect to home screen
        } else {
          setUserDetail(storage);
        }
      } catch (e) {
        console.error("Invalid JSON in userDetail", e);
        // optional: redirect or clear corrupted localStorage
      }
      setIsHydrated(true);
    }
  }, []);
  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider
              value={{ dragElementLayout, setDragElementLayout }}
            >
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}
              >
                <SelectedElementContext.Provider value={{selectedElement, setSelectedElement}}>
                <div>{children}</div>
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export default Provider;
export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};
export const useDragElementLayout = () => {
  return useContext(DragDropLayoutElement);
};
export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
};
export const useSelectedElement=()=>{
  return useContext(SelectedElementContext)
}
