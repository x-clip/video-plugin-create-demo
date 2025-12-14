import React from "react";
import { options, observer } from "@sdk/videoEditorSDK.react.es.min.js";
import { Tabs, TabPane } from "@douyinfe/semi-ui";
import QrcodeSet from "./QrcodeSet";
import { QrcodeElement } from "./ElementData";

export interface IOptionsProps {
  editor: Record<string, any>;
  element: QrcodeElement;
  language: Record<string, any>;
}

console.log('options>>>>>>>>>>', options)

function Option(props: IOptionsProps) {
  const { Align, Opacity, Rotation, Size, Position, Colour, Animation } =
    options;
  const { editor, element, language } = props;
  return (
    <Tabs
      className="optionTabs"
      activeKey={editor.elementOptionType}
      onChange={(e) => {
        editor.elementOptionType = e as any;
      }}
    >
      <TabPane tab={language.val("option_tab_base")} itemKey="basic">
        <div className="scroll scrollBox">
          <Align />
          <Position />
          <Size />
          <QrcodeSet {...props} />
          <Opacity />
          <Rotation />
        </div>
      </TabPane>
      <TabPane tab={language.val("option_tab_animation")} itemKey="animation">
        <Animation />
      </TabPane>
      <TabPane tab={language.val("option_tab_filter")} itemKey="colour">
        <Colour />
      </TabPane>
    </Tabs>
  );
}

export default observer(Option);
