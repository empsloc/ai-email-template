"use client";
import {
  useDragElementLayout,
  useEmailTemplate,
  useSelectedElement,
} from "@/app/provider";
import React, { useState } from "react";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import LogoHeaderComponent from "../custom/Element/LogoHeaderComponent";
import SocialIconsComponent from "../custom/Element/SocialIconsComponent";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";

function ColumnLayout({ layout }: any) {
  const [dragOver, setDragOver] = useState<any>();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const onDragOverHandle = (event: any, index: any) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };
  const onDropHandle = () => {
    const index = dragOver.index;
    setEmailTemplate((prevItem: any) =>
      prevItem.map((col: any) =>
        col.id === layout?.id
          ? { ...col, [index]: dragElementLayout?.dragElement }
          : col
      )
    );
    console.log(emailTemplate);
    setDragOver(null);
  };

  const GetElementComponent = (element: any) => {
    console.log(element);
    if (element?.type == "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type == "Text") {
      return <TextComponent {...element} />;
    } else if (element?.type == "Image") {
      return <ImageComponent {...element} />;
    } else if (element?.type == "Logo") {
      return <LogoComponent {...element} />;
    } else if (element?.type == "Divider") {
      return <DividerComponent {...element} />;
    } else if (element?.type == "LogoHeader") {
      return <LogoHeaderComponent {...element} />;
    } else if (element?.type == "SocialIcons") {
      return <SocialIconsComponent {...element} />;
    }
    return element?.type;
  };
  const deleteLayout = (layoutId: any) => {
    const updatedEmailTemplate = emailTemplate?.filter(
      (item: any) => item.id != layoutId
    );
    setEmailTemplate(updatedEmailTemplate);
    setSelectedElement(null);
  };

  const moveItemUp=(layoutId:any)=>{
    const index = emailTemplate.findIndex((item:any)=>item.id===layoutId)
    if(index>0){
      setEmailTemplate((prevItems:any)=>{
        const updatedItems:any[] = [...prevItems];
        [updatedItems[index], updatedItems[index-1]]=[
          updatedItems[index-1],updatedItems[index],
        ]
        return updatedItems
      })
    }

  }
  const moveItemDown=(layoutId:any)=>{
    const index = emailTemplate.findIndex((item:any)=>item.id===layoutId)
    if(index>0){
      setEmailTemplate((prevItems:any)=>{
        const updatedItems:any[] = [...prevItems];
        [updatedItems[index], updatedItems[index+1]]=[
          updatedItems[index+1],updatedItems[index],
        ]
        return updatedItems
      })
    }

  }
  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol},1fr)`,
          gap: "0px",
        }}
        className={`${selectedElement?.layout?.id == layout?.id && "border border-dashed border-blue-500"}`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            className={`${index == dragOver?.index && dragOver?.columnId && "bg-green-100"} ${selectedElement?.layout?.id == layout?.id && selectedElement?.index == index && "border-blue-500 border-4"}  flex cursor-pointer items-center ${!layout?.[index]?.type && "bg-gray-100 border border-dashed"} justify-center`}
            key={index}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {GetElementComponent(layout?.[index]) ?? "Drag element here"}
          </div>
        ))}
        {selectedElement?.layout?.id == layout?.id && (
          <div className="absolute -right-10 flex gap-2 flex-col">
          <div
            onClick={() => deleteLayout(layout?.id)}
            className=" hover:scale-105 transition-all hover:shadow-md  bg-gray-100 p-2 rounded-full cursor-pointer "
          >
            <Trash className="h-4 w-4 text-red-500" />
            
          </div>
          {/* <div
            onClick={() => moveItemUp(layout?.id)}
            className=" hover:scale-105 transition-all hover:shadow-md  bg-gray-100 p-2 rounded-full cursor-pointer "
          >
            <ArrowUp className="h-4 w-4 text-red-500" />
            
          </div>
          <div
            onClick={() => moveItemDown(layout?.id)}
            className=" hover:scale-105 transition-all hover:shadow-md  bg-gray-100 p-2 rounded-full cursor-pointer "
          >
            <ArrowDown className="h-4 w-4 text-red-500" />
            
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnLayout;
