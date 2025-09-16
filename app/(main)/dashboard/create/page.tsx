// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Sparkle, Sparkles } from "lucide-react";
// import AIInputBox from "@/components/custom/AIInputBox";

// function CreateNew() {
//   return (
//     <div className="px-10 md:px-28 lg:px-64 xl:px-72 mt-20">
//       <div className="flex flex-col items-center">
//         <h2 className="font-bold text-3xl text-primary">CREATE NEW EMAIL TEMPLATE</h2>
//         <p className="text-lg text-gray-400">
//           Effortlessly design and customize professional AI-powered email
//           templates with ease
//         </p>
//         <Tabs defaultValue="AI" className="w-[500px] mt-10">
//           <TabsList>
//             <TabsTrigger value="AI">Create with AI <Sparkles className="h-5 w-5 ml-2 "/></TabsTrigger>
//             <TabsTrigger value="SCRATCH">Start From Scratch</TabsTrigger>
//           </TabsList>
//           <TabsContent value="AI">
//             <AIInputBox/>
//           </TabsContent>
//           <TabsContent value="SCRATCH">Change your password here.</TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default CreateNew;

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import AIInputBox from "@/components/custom/AIInputBox";

function CreateNew() {
  return (
    <div className="px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 mt-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-bold text-2xl sm:text-3xl text-primary">
          CREATE NEW EMAIL TEMPLATE
        </h2>
        <p className="text-base sm:text-lg text-gray-400 mt-2">
          Effortlessly design and customize professional AI-powered email
          templates with ease
        </p>

        <Tabs
          defaultValue="AI"
          className="w-full sm:w-[400px] md:w-[500px] mt-8 "
        >
          <TabsList className="flex flex-col sm:flex-row w-full bg-transparent sm:bg-gray-100 ">
            <TabsTrigger value="AI" className="flex items-center justify-center cursor-pointer">
              Create with AI <Sparkles className="h-5 w-5 ml-2" />
            </TabsTrigger>
            <TabsTrigger value="SCRATCH" className="flex items-center justify-center cursor-pointer">
              Start From Scratch
            </TabsTrigger>
          </TabsList>

          <TabsContent value="AI" className="mt-4">
            <AIInputBox />
          </TabsContent>
          <TabsContent value="SCRATCH" className="mt-4">
            This functionality will be added soon...
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default CreateNew;

