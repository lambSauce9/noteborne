import React, { useRef, useCallback, useState } from "react";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools/tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { ColorPicker, InputNumber } from "antd";
import DragDrop from "editorjs-drag-drop";

export default function Editor({ data, setData, setTitleColor }) {
  const editorCore = useRef(null);
  const ReactEditorJS = createReactEditorJS();
  const [textColor, setTextColor] = useState("#000000");

  const instanceRef = useRef(null);

  // const handleInitialize = useCallback((instance) => {
  //   // await instance._editorJS.isReady;
  //   instance._editorJS.isReady
  //     .then(() => {
  //       // set reference to editor
  //       editorCore.current = instance;
  //     })
  //     .catch((err) => console.log("An error occured", err));
  // }, []);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    // retrieve data inserted
    const savedData = await editorCore.current.save();
    // save data
    // setData(savedData);
    console.log("savedData", savedData);
  }, [setData]);

  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new DragDrop(editor);
  };

  return (
    <div className="editor-container" style={{ color: textColor }}>
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
      </div>

      <ReactEditorJS
        instanceRef={(instance) => (instanceRef.current = instance)}
        onReady={handleReady}
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
      />
    </div>
  );
}
