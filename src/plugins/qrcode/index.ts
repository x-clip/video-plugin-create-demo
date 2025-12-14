import type { PluginConfig } from "../plugins.d.ts";
import { config } from "./config";
import Element from "./Element";
import Options from "./Options";
import { QrcodeElement as ElementData } from "./ElementData";

const conf: PluginConfig = {
  ...config,
  Element: Element as React.FC,
  Options,
  ElementData,
};

export default conf;
