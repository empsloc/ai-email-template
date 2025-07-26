"use client";
import { useSelectedElement } from "@/app/provider";
import React, { useEffect, useState } from "react";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
import ToggleGroupField from "./Settings/ToggleGroupField";
import { AArrowUp, AlignCenter, AlignLeft, AlignRight, CaseLower, CaseUpper, CaseUpperIcon } from "lucide-react";
import { AnyARecord } from "node:dns";
import DropdownField from "./Settings/DropdownField";
import ImagePreview from "./Settings/ImagePreview";
const TextAlignOptions=[
  {
    value:"left",
    icon:AlignLeft
  },
  {
    value:"center",
    icon:AlignCenter
  },
  {
    value:"right",
    icon:AlignRight
  },
]
const TextTransformOptions=[
  {
    value:"uppercase",
    icon:CaseUpper
  },
  {
    value:"lowercase",
    icon:CaseLower
  },
  {
    value:"capitalize",
    icon:AArrowUp
  },
]

function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [element, setElement] = useState<any>();
  useEffect(() => {
    console.log(selectedElement?.layout?.[selectedElement?.index]);
    setElement(selectedElement?.layout?.[selectedElement?.index]);
  }, [selectedElement]);
  const onHandleInputChange = (fieldName: any, value: any) => {
    console.log(fieldName, value);
    //copy of current Selected element
    const updatedData = { ...selectedElement };
    //update the specific field
    updatedData.layout[selectedElement.index][fieldName] = value;

    //update original selectedElement
    setSelectedElement(updatedData);
  };

  const onHandleStyleChange = (fieldName: any, fieldValue: any) => {
    let updateElement = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...selectedElement?.layout[selectedElement?.index],
          style: {
            ...selectedElement?.layout[selectedElement?.index]?.style,
            [fieldName]: [fieldValue],
          },
        },
      },
    };
    setSelectedElement(updateElement);
  };

  const onHandleOuterStyleChange = (fieldName: any, fieldValue: any) => {
    let updateElement = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...selectedElement?.layout[selectedElement?.index],
          outerStyle: {
            ...selectedElement?.layout[selectedElement?.index]?.outerStyle,
            [fieldName]: [fieldValue],
          },
        },
      },
    };
    setSelectedElement(updateElement);
  };
  return (
    <div className="p-5 flex flex-col gap-4">
      <h2 className="font-bold text-xl">Settings</h2>
      {element?.imageUrl && (
        <ImagePreview
          label={"Image Preview"}
          value={element?.imageUrl}
          onHandleInputChange={(value: any) =>
            onHandleInputChange("imageUrl", value)
          }
        />
      )}
      {element?.content && (
        <InputField
          label={"Content"}
          value={element?.content}
          onHandleInputChange={(value: any) =>
            onHandleInputChange("content", value)
          }
        />
      )}
      {element?.textarea && (
        <TextAreaField
          label={"Text Area"}
          value={element?.textarea}
          onHandleInputChange={(value: any) =>
            onHandleInputChange("textarea", value)
          }
        />
      )}
      {element?.url && (
        <InputField
          label={"url"}
          value={element?.url}
          onHandleInputChange={(value: any) =>
            onHandleInputChange("url", value)
          }
        />
      )}
      {element?.style?.width && (
        <SliderField
          label={"Width"}
          value={element?.style?.width}
          type="%"
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("width", value)
          }
        />
      )}
      {element?.style?.textAlign && (
        <ToggleGroupField
          label={"Text Align"}
          value={element?.style?.textAlign}
          options={TextAlignOptions}
          onHandleStyleChange={(value:AnyARecord)=>onHandleStyleChange("textAlign",value)}
        />
      )}
      {element?.style?.backgroundColor && (
        <ColorPickerField
          label="Background Color"
          value={element?.style?.backgroundColor}
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("backgroundColor", value)
          }
        />
      )}
      {element?.style?.color && (
        <ColorPickerField
          label="Text Color"
          value={element?.style?.color}
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("color", value)
          }
        />
      )}
      {element?.style?.fontSize && (
        <InputStyleField
          label={"Font Size"}
          value={element?.style?.fontSize}
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("fontSize", value)
          }
        />
      )}
       {element?.style?.textTransform && (
        <ToggleGroupField
          label={"Text Transform"}
          value={element?.style?.textTransform}
          options={TextTransformOptions}
          onHandleStyleChange={(value:AnyARecord)=>onHandleStyleChange("textTransform",value)}
        />
      )}

      {element?.style?.padding && (
        <InputStyleField
          label={"Padding"}
          value={element?.style?.padding}
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("padding", value)
          }
        />
      )}
      {element?.style?.margin && (
        <InputStyleField
          label={"Margin"}
          value={element?.style?.margin}
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("margin", value)
          }
        />
      )}
      {element?.style?.borderRadius && (
        <SliderField
          label={"Border Radius"}
          value={element?.style?.borderRadius}
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("borderRadius", value)
          }
        />
      )}
      {element?.style?.fontWeight && (
        <DropdownField
          label={"Font Weight"}
          value={element?.style?.fontWeight}
          options={['normal','bold']}
          onHandleStyleChange={(value: any) =>
            onHandleStyleChange("fontWeight", value)
          }
        />
      )}
      <div>
        <h2 className="font-bold mb-2">Outer Style</h2>
      {element?.outerStyle?.backgroundColor&&<ColorPickerField
          label="Background Color"
          value={element?.outerStyle?.backgroundColor}
          onHandleStyleChange={(value: any) =>
            onHandleOuterStyleChange("backgroundColor", value)
          }
        />}
        {element?.outerStyle?.justifyContent&&<ToggleGroupField
          label="Align"
          options={TextAlignOptions}
          value={element?.outerStyle?.justifyContent}
          onHandleStyleChange={(value: any) =>
            onHandleOuterStyleChange("justifyContent", value)
          }
        />}
      </div>
      
      
    </div>
  );
}

export default Settings;
