import React, { useRef, useCallback, useState } from "react";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools/tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { ColorPicker, InputNumber } from "antd";

export default function Editor({ data, setData, setTitleColor }) {
  const editorCore = useRef(null);
  const ReactEditorJS = createReactEditorJS();
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(16);

  const handleInitialize = useCallback((instance) => {
    // await instance._editorJS.isReady;
    instance._editorJS.isReady
      .then(() => {
        // set reference to editor
        editorCore.current = instance;
      })
      .catch((err) => console.log("An error occured", err));
  }, []);

  const handleSave = useCallback(async () => {
    // retrieve data inserted
    const savedData = await editorCore.current.save();
    // save data
    // setData(savedData);
    // console.log("savedData", savedData);
  }, [setData]);

  return (
    <div
      className="editor-container"
      style={{ color: textColor, fontSize: fontSize }}
    >
      <div
        style={{
          flexDirection: "column",
          maxWidth: 200,
          marginLeft: "30%",
        }}
      >
        <ColorPicker
          value={textColor}
          size="large"
          showText
          format="hex"
          onChange={(color) => {
            setTextColor(color.toHexString());
          }}
        />
        <InputNumber
          style={{ height: 40, width: 121 }}
          min={8}
          max={40}
          defaultValue={16}
          value={fontSize}
          onChange={(number) => setFontSize(number)}
        />
      </div>

      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
      />
    </div>
  );
}
