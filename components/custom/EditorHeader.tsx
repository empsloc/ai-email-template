// "use client"
// import Image from "next/image";
// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { Code, Menu, Monitor, Smartphone, X } from "lucide-react";
// import { useEmailTemplate, useScreenSize } from "@/app/provider";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useParams } from "next/navigation";
// import { toast } from "sonner";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// function EditorHeader({ viewHTMLCode }: any) {
//   const { screenSize, setScreenSize } = useScreenSize();
//   const updatedEmailTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign);
//   const { templateId } = useParams<any>();
//   const { emailTemplate } = useEmailTemplate();
//   const [isOpen, setIsOpen] = useState(false);

//   const onSaveTemplate = async () => {
//     await updatedEmailTemplate({
//       tid: templateId,
//       design: emailTemplate,
//     });
//     toast("Email template saved successfully");
//   };

//   return (
//     <header className="p-4 shadow-sm flex justify-between items-center relative">
//       {/* Logo */}
//       <Image src={"/logo.svg"} alt="logo" width={140} height={120} />

//       {/* Desktop Actions */}
//       <div className="hidden md:flex gap-3 items-center">
//         <Button
//           onClick={() => setScreenSize("desktop")}
//           className={`cursor-pointer hover:text-primary ${
//             screenSize == "desktop" && "bg-purple-100"
//           }`}
//           variant={"ghost"}
//         >
//           <Monitor /> Desktop
//         </Button>
//         <Button
//           onClick={() => setScreenSize("mobile")}
//           className={`cursor-pointer hover:text-primary ${
//             screenSize == "mobile" && "bg-purple-100"
//           }`}
//           variant={"ghost"}
//         >
//           <Smartphone /> Mobile
//         </Button>

//         <Button
//           className="cursor-pointer hover:text-primary"
//           variant={"ghost"}
//           onClick={() => viewHTMLCode(true)}
//         >
//           <Code />
//         </Button>
//         <Button variant={"outline"}>Send Test Email</Button>

//         {/* Save Template with Tooltip */}
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button className="cursor-pointer" onClick={onSaveTemplate}>
//                 Save Template
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>Click on Save to save the generated template</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden p-2"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="Toggle menu"
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Sidebar for Mobile */}
//       {isOpen && (
//         <div className="absolute top-0 right-0 h-screen w-64 bg-white shadow-lg z-50 flex flex-col p-6 gap-4">
//           <button
//             className="self-end mb-6"
//             onClick={() => setIsOpen(false)}
//             aria-label="Close menu"
//           >
//             <X size={24} />
//           </button>

//           <Button
//             onClick={() => {
//               setScreenSize("desktop");
//               setIsOpen(false);
//             }}
//             className={`cursor-pointer hover:text-primary ${
//               screenSize == "desktop" && "bg-purple-100"
//             }`}
//             variant={"ghost"}
//           >
//             <Monitor /> Desktop
//           </Button>
//           <Button
//             onClick={() => {
//               setScreenSize("mobile");
//               setIsOpen(false);
//             }}
//             className={`cursor-pointer hover:text-primary ${
//               screenSize == "mobile" && "bg-purple-100"
//             }`}
//             variant={"ghost"}
//           >
//             <Smartphone /> Mobile
//           </Button>

//           <Button
//             className="cursor-pointer hover:text-primary"
//             variant={"ghost"}
//             onClick={() => {
//               viewHTMLCode(true);
//               setIsOpen(false);
//             }}
//           >
//             <Code /> View Code
//           </Button>
//           <Button variant={"outline"} onClick={() => setIsOpen(false)}>
//             Send Test Email
//           </Button>

//           {/* Save Template with Tooltip (Mobile Sidebar) */}
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   className="cursor-pointer"
//                   onClick={() => {
//                     onSaveTemplate();
//                     setIsOpen(false);
//                   }}
//                 >
//                   Save Template
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent side="left">
//                 <p>Click on Save to save the  template</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       )}
//     </header>
//   );
// }

// export default EditorHeader;


"use client"
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Code, Menu, Monitor, Smartphone, X, Info } from "lucide-react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// shadcn dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

function EditorHeader({ viewHTMLCode }: any) {
  const { screenSize, setScreenSize } = useScreenSize();
  const updatedEmailTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign);
  const { templateId } = useParams<any>();
  const { emailTemplate } = useEmailTemplate();
  const [isOpen, setIsOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // dialog state

  const onSaveTemplate = async () => {
    await updatedEmailTemplate({
      tid: templateId,
      design: emailTemplate,
    });
    toast("Email template saved successfully");
  };

  return (
    <header className="p-4 shadow-sm flex justify-between items-center relative">
      {/* Logo */}
      <Link href={"/"}><Image src={"/logo.svg"} alt="logo" width={140} height={120} /></Link>

      {/* Desktop Actions */}
      <div className="hidden md:flex gap-3 items-center">
         {/* Info button for Developer’s Note */}
         <Button
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() => setOpenDialog(true)}
        >
          <Info />
        </Button>
        <Button
          onClick={() => setScreenSize("desktop")}
          className={`cursor-pointer hover:text-primary ${
            screenSize == "desktop" && "bg-purple-100"
          }`}
          variant={"ghost"}
        >
          <Monitor /> Desktop
        </Button>
        <Button
          onClick={() => setScreenSize("mobile")}
          className={`cursor-pointer hover:text-primary ${
            screenSize == "mobile" && "bg-purple-100"
          }`}
          variant={"ghost"}
        >
          <Smartphone /> Mobile
        </Button>

        <Button
          className="cursor-pointer hover:text-primary"
          variant={"ghost"}
          onClick={() => viewHTMLCode(true)}
        >
          <Code />
        </Button>
        <Button variant={"outline"}>Send Test Email</Button>

        {/* Save Template with Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="cursor-pointer" onClick={onSaveTemplate}>
                Save Template
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click on Save to save the generated template</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

       
      </div>

      {/* Developer’s Note Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Developer’s Note</DialogTitle>
            <DialogDescription>
              To use the editor:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm text-gray-700">
          <ul className="list-disc pl-5 space-y-1">
          <li>Click and select any element in the generated template to customize it.</li>
      <li>Drag and drop layouts (if needed) from left sidebar to customize the email template layout.</li>
      <li>Add elements (if needed) from the left sidebar to the layouts.</li>
      <li>Cick on <b className="font-extrabold text-purple-400">{" <> "}</b> button to see the code of the template.</li>

      <li>Select element you want to stylize in the template and customize it in the right sidebar</li>



        <li>Click on <b className='font-extrabold text-purple-400'>Save Template</b> button to save the template or else the progress might be lost while refreshing.</li>
        
      </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} className="cursor-pointer">Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for Mobile */}
      {isOpen && (
        <div className="absolute top-0 right-0 h-screen w-64 bg-white shadow-lg z-50 flex flex-col p-6 gap-4">
          <button
            className="self-end mb-6"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

{/* Info button inside mobile sidebar */}
 {/* Info button for Developer’s Note */}
 <Button
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() => setOpenDialog(true)}
        >
          <Info />
        </Button>
          <Button
            onClick={() => {
              setScreenSize("desktop");
              setIsOpen(false);
            }}
            className={`cursor-pointer hover:text-primary ${
              screenSize == "desktop" && "bg-purple-100"
            }`}
            variant={"ghost"}
          >
            <Monitor /> Desktop
          </Button>
          <Button
            onClick={() => {
              setScreenSize("mobile");
              setIsOpen(false);
            }}
            className={`cursor-pointer hover:text-primary ${
              screenSize == "mobile" && "bg-purple-100"
            }`}
            variant={"ghost"}
          >
            <Smartphone /> Mobile
          </Button>

          <Button
            className="cursor-pointer hover:text-primary"
            variant={"ghost"}
            onClick={() => {
              viewHTMLCode(true);
              setIsOpen(false);
            }}
          >
            <Code /> View Code
          </Button>
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Send Test Email
          </Button>

          {/* Save Template with Tooltip (Mobile Sidebar) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    onSaveTemplate();
                    setIsOpen(false);
                  }}
                >
                  Save Template
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Click on Save to save the  template</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          
        </div>
      )}
    </header>
  );
}

export default EditorHeader;
