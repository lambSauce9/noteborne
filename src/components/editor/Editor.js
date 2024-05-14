import React, { useRef, useCallback, useState, useEffect } from "react";
import ReactDOM from "react-dom";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools/tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { Alert, Checkbox, ColorPicker, InputNumber } from "antd";
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

  const handleSave = useCallback(
    async (e) => {
      console.log(e);
      // retrieve data inserted
      const savedData = await editorCore.current.save();
      // save data
      setData(savedData);
      // console.log("savedData", savedData);
    },
    [setData]
  );

  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new DragDrop(editor);
  };

  var first = document.createElement("input");
  first.setAttribute("type", "color");
  first.addEventListener("change", (event) => {
    if (!document.querySelector("div.ce-block.ce-block--focused")) {
      Alert("Please click on the block you want to change color");
    } else {
      document.querySelector(
        "div.ce-block.ce-block--focused"
      ).style.backgroundColor = event.target.value;
    }
  });

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
      {/* <div
        onClick={() => {
          if (document.getElementsByClassName("ce-settings").length === 0) {
            return;
          } else {
            document
              .getElementsByClassName("ce-settings")[0]
              .appendChild(first);
          }
        }}
      >
        Allow to change block color
      </div> */}
      <Checkbox
        onClick={() => {
          if (document.getElementsByClassName("ce-settings").length === 0) {
            return;
          } else {
            document
              .getElementsByClassName("ce-settings")[0]
              .appendChild(first);
          }
        }}
      >
        Allow to change block color, Press "Enter" after choosing the color for
        the background
      </Checkbox>

      <ReactEditorJS
        instanceRef={(instance) => (instanceRef.current = instance)}
        onReady={handleReady}
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
        autofocus={true}
      />
    </div>
  );
}
