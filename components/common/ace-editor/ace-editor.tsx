import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "semantic-ui-react";

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace");
    require("ace-builds/src-noconflict/mode-java");
    require("ace-builds/src-noconflict/mode-python");
    require("ace-builds/src-noconflict/mode-javascript");
    require("ace-builds/src-noconflict/mode-plain_text");
    require("ace-builds/src-noconflict/mode-json");
    require("ace-builds/src-noconflict/theme-xcode");
    require("ace-builds/src-noconflict/theme-monokai");
    require("ace-builds/src-noconflict/ext-language_tools");
    return ace;
  },
  {
    loading: () => (
      <Loader active inverted size="medium">
        Loading
      </Loader>
    ),
    ssr: false,
  }
);

const Editor = (props) => (
  <AceEditor
    width={props.width}
    height={props.height}
    mode={props.mode}
    theme={props.theme}
    value={props.value}
    editorProps={props.editorProps}
    onChange={props.onChange}
    setOptions={props.setOptions}
  />
);

export default Editor;
