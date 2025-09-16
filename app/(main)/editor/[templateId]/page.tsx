// // "use client"
// // import { useEmailTemplate, useUserDetail } from '@/app/provider'
// // import Canvas from '@/components/custom/Canvas'
// // import EditorHeader from '@/components/custom/EditorHeader'
// // import ElementsSideBar from '@/components/custom/ElementsSideBar'
// // import Settings from '@/components/custom/Settings'
// // import { api } from '@/convex/_generated/api'
// // import { useConvex } from 'convex/react'
// // import { useParams } from 'next/navigation'

// // import React, { useEffect, useState } from 'react'
// // export interface EmailTemplateType {
// //     _id: string;
// //     tid: string;
// //     design: any; // or a more specific type if possible
// //     email: string;
// //     description: string;
// //   }
// // function  Editor() {
// //   const [viewHTMLCode,setViewHTMLCode] = useState<any>()
// //   const {templateId} = useParams<any>()
// //   const {userDetail,setUserDetail}  = useUserDetail()
// //   const [loading,setLoading] = useState<any>(false)
// //   const {emailTemplate,setEmailTemplate} = useEmailTemplate()
// //   const convex = useConvex()

// //   useEffect(()=>{
// //     if(userDetail){
// //       GetTemplateData()
// //     }
// //   },[userDetail])
// //   const GetTemplateData=async()=>{
// //     setLoading(true)
// //     const result = await convex.query(api.emailTemplate.GetTemplateDesign,{
// //       tid:templateId,
// //       email:userDetail?.email

// //     }) as EmailTemplateType;


// //     console.log(result)
// //     if(result){
// //       setEmailTemplate(result?.design)
// //     }
    
// //     setLoading(false)
// //   }
// //   return (
// //     <div> 
// //         <EditorHeader viewHTMLCode={(v:any)=>setViewHTMLCode(v)}/>
// //         {!loading?<div className='grid grid-cols-5 '>
// //             <ElementsSideBar/>
// //             <div className='col-span-3 bg-gray-100'>
// //                 <Canvas closeDialog={()=>setViewHTMLCode(false)} viewHTMLCode = {viewHTMLCode}/>
// //             </div>
// //             <Settings/>
            
// //         </div>:<div>Please wait ...</div>}
// //     </div>
// //   )
// // }

// // export default  Editor


// "use client"
// import { useEmailTemplate, useUserDetail } from '@/app/provider'
// import Canvas from '@/components/custom/Canvas'
// import EditorHeader from '@/components/custom/EditorHeader'
// import ElementsSideBar from '@/components/custom/ElementsSideBar'
// import Settings from '@/components/custom/Settings'
// import { api } from '@/convex/_generated/api'
// import { useConvex } from 'convex/react'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// // shadcn imports
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"

// export interface EmailTemplateType {
//   _id: string;
//   tid: string;
//   design: any; // or a more specific type if possible
//   email: string;
//   description: string;
// }

// function Editor() {
//   const [viewHTMLCode, setViewHTMLCode] = useState<any>()
//   const { templateId } = useParams<any>()
//   const { userDetail, setUserDetail } = useUserDetail()
//   const [loading, setLoading] = useState<any>(false)
//   const { emailTemplate, setEmailTemplate } = useEmailTemplate()
//   const convex = useConvex()

//   // dialog state
//   const [openDialog, setOpenDialog] = useState(true)

//   useEffect(() => {
//     if (userDetail) {
//       GetTemplateData()
//     }
//   }, [userDetail])

//   const GetTemplateData = async () => {
//     setLoading(true)
//     const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
//       tid: templateId,
//       email: userDetail?.email
//     }) as EmailTemplateType;

//     if (result) {
//       setEmailTemplate(result?.design)
//     }
//     setLoading(false)
//   }

//   return (
//     <div>
//       {/* Developer's Note Dialog */}
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//   <DialogContent className="sm:max-w-lg">
//     <DialogHeader>
//       <DialogTitle>Developer’s Note</DialogTitle>
//       <DialogDescription>
//         To use the editor : 
//       </DialogDescription>
//     </DialogHeader>

//     {/* Put the list outside of DialogDescription */}
//     <div className="mt-4 text-sm text-gray-700">
//       <ul className="list-disc pl-5 space-y-1">
//       <li>Drag and drop layouts from left sidebar to customize the email template.</li>
//       <li>Add elements from the left sidebar to the layouts.</li>
//       <li>Select element you want to stylize in the template and customize it in the right sidebar</li>



//         <li>Click on <b className='font-extrabold text-purple-400'>Save Template</b> button to save the template or else the progress might be lost while refreshing.</li>
        
//       </ul>
//     </div>

//     <DialogFooter>
//       <Button onClick={() => setOpenDialog(false)} className='cursor-pointer'>Got it</Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>

//       <EditorHeader viewHTMLCode={(v: any) => setViewHTMLCode(v)} />
//       {!loading ? (
//         <div className='grid grid-cols-5 '>
//           <ElementsSideBar />
//           <div className='col-span-3 bg-gray-100'>
//             <Canvas closeDialog={() => setViewHTMLCode(false)} viewHTMLCode={viewHTMLCode} />
//           </div>
//           <Settings />
//         </div>
//       ) : (
//         <div>Please wait ...</div>
//       )}
//     </div>
//   )
// }

// export default Editor


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

// shadcn imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Layout, Settings2 } from 'lucide-react'

export interface EmailTemplateType {
  _id: string;
  tid: string;
  design: any; // or a more specific type if possible
  email: string;
  description: string;
}

function Editor() {
  const [viewHTMLCode, setViewHTMLCode] = useState<any>()
  const { templateId } = useParams<any>()
  const { userDetail } = useUserDetail()
  const [loading, setLoading] = useState<any>(false)
  const { setEmailTemplate } = useEmailTemplate()
  const convex = useConvex()

  // developer note dialog state
  const [openDialog, setOpenDialog] = useState(true)

  // mobile sidebar dialogs
  const [openElements, setOpenElements] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)

  useEffect(() => {
    if (userDetail) {
      GetTemplateData()
    }
  }, [userDetail])

  const GetTemplateData = async () => {
    setLoading(true)
    const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
      tid: templateId,
      email: userDetail?.email
    }) as EmailTemplateType;

    if (result) {
      setEmailTemplate(result?.design)
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Developer's Note Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Developer’s Note</DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-sm text-gray-700">
          <ul className="list-disc pl-5 space-y-1">
          <li>Click and select any element in the generated template to customize it.</li>
      <li>Drag and drop layouts (if needed) from left sidebar to customize the email template layout.</li>
      <li>Add elements (if needed) from the left sidebar to the layouts.</li>
      <li>Cick on <b className="font-extrabold text-purple-400">{" <> "}</b> button to see the code of the template.</li>

      <li>Select element you want to stylize in the template and customize it in the right sidebar</li>



        <li>Click on <b className='font-extrabold text-purple-400'>Save Template</b> button to save the template or else the progress might be lost while refreshing.</li>
        
      </ul>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setOpenDialog(false)}>Got it</Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditorHeader viewHTMLCode={(v: any) => setViewHTMLCode(v)} />

      {!loading ? (
        <div>
          {/* Desktop layout */}
          <div className="hidden md:grid grid-cols-5">
            <ElementsSideBar />
            <div className="col-span-3 bg-gray-100">
              <Canvas closeDialog={() => setViewHTMLCode(false)} viewHTMLCode={viewHTMLCode} />
            </div>
            <Settings />
          </div>

          {/* Mobile layout */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="flex justify-between gap-3 p-2 mt-10">
              <Button onClick={() => setOpenElements(true)} variant={'outline'}><Layout/></Button>
              <Button onClick={() => setOpenSettings(true)} variant={'outline'}><Settings2/></Button>
            </div>

            <div className="bg-gray-100 min-h-[60vh]">
              <Canvas closeDialog={() => setViewHTMLCode(false)} viewHTMLCode={viewHTMLCode} />
            </div>
          </div>

         {/* Mobile Settings Sidebar Dialog */}
<Dialog open={openElements} onOpenChange={setOpenElements}>
  <DialogContent className="max-w-[95%] sm:max-w-lg overflow-y-auto max-h-[90vh]">
    <DialogHeader>
      <DialogTitle>Elements</DialogTitle>
    </DialogHeader>
    <div className="p-4 text-center text-sm text-muted-foreground">
      🚫 This feature is only available on desktop or larger devices.  
      Please switch to a bigger screen to use <b>Elements</b>.
    </div>
  </DialogContent>
</Dialog>


          {/* Mobile Settings Sidebar Dialog */}
          <Dialog open={openSettings} onOpenChange={setOpenSettings}>
            <DialogContent className="max-w-[95%] sm:max-w-lg overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <Settings />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>Please wait ...</div>
      )}
    </div>
  )
}

export default Editor
