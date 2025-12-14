import * as PIXI from 'pixi.js';
/**
 * 元素类型
 * video 视频
 * image 图片
 * sticker 贴纸（gif,svg）
 * text 文本
 * audio 音频
 * effect 特效
 * filter 滤镜
 * mask 遮罩
 * group 组
 * lottie lottie动画
 */
export type ElementType =
  | 'video'
  | 'image'
  | 'sticker'
  | 'text'
  | 'audio'
  | 'effect'
  | 'filter'
  | 'mask'
  | 'group'
  | 'caption'
  | 'lottie'
  | string;

/**
 * data数据
 */
export interface MovieData {
  title: string; // 名称
  version: string; // 数据版本
  ratio?: string; // 16:9
  createTime: number; // 创建时间（时间戳）
  updateTime: number; // 更新时间（时间戳）
  poster: string; // 封面图片
  width: number; // 原始尺寸
  height: number;
  background: Background; // 背景
  transitions: TransitionItem[]; // 转场动画
  cameras?: CameraElement[]; // 相机，相机trackIndex 默认是-2
  captions: CaptionElement[]; // 字幕trackIndex 默认是-1
  elements: BaseElement[]; // 元素
  resouces: Resource[]; // 资源文件
  // 记录编辑器中的配置
  _hideLock: Record<number, { hide: boolean; lock: boolean }>;
}

/**
 * 内核的使用环境
 * editor: 编辑模式
 * preview: 预览模式
 * export: 导出视频模式
 */
export type Env = 'editor' | 'preview' | 'export';

/**
 * 资源类型
 */
export type SourceType = 'image' | 'video' | 'audio' | 'text' | 'lottie' | '';

/**
 * 视频相关工具库
 */
export type Resolution = '480P' | '720P' | '1080P' | '2K' | '4K';

/**
 * 视频比例
 */
export type VideoRatio = '16:9' | '9:16' | '1:1' | '3:4' | '4:3' | '4:5' | '2:3' | '21:9' | string;

export interface StyleSize {
  width: number;
  height: number;
}

/**
 * 元素组件props参数
 */
export interface PixiElementProps {
  currentTime: number; // 绝对时间
  relativeTime: number | null; // 相对时间
  visible: boolean; // 显示隐藏
  hide: boolean; // 编辑器用到的，优先级会比 visible更高
  lock: boolean;
  scale: number;
  trackIndex: number;
  transitionElement?: TransitionItem;
  nextElement?: BaseElement;
  element: BaseElement;
  hasTransition?: boolean;
  parent?: PIXI.Container;
  children?: JSX.Element | JSX.Element[];
  dirty: string; // 用于更新组件
  store: Record<string, any>; // 组件全局参数和方法的集合
  env: Env;
}

// 文件支持类型
export type FileType =
  | 'png'
  | 'jpeg'
  | 'jpg'
  | 'gif'
  | 'svg'
  | 'mp3'
  | 'mp4'
  | 'mov'
  | 'aac'
  | 'json'
  | 'lottie'
  | string;

// 资源类型
export interface Resource {
  id: string;
  name: string; // 名称
  type: SourceType; // 资源类型
  url: string; // 资源地址
  reverse?: boolean; // 是否倒放视频？
  originId?: string; // 原始资源文件的id
  thumb?: string; // 缩图
  wave?: string; // 音波json
  frames?: string; // 帧图
  noAudioTracks?: boolean; // 无音轨
  styleSize?: StyleSize; // 尺寸，视频和图片都有尺寸
  fileSize?: number; // 文件大小
  mustFetch: boolean; // 渲染之前是否必须要fetch文件
  fileType: FileType; // 文件支持类型
  from: 'user' | 'system' | 'other'; // 资源来源
  duration?: number; // 持续时间，视频和音频文件才有
  extend?: any; // 扩展字段
  attrs?: Record<string, any>; // 扩展字段
}

/**
 * 滤镜
 */
export interface Filter {
  name: string; // 滤镜类名
  enabled: boolean;
  params: Record<string, any>; // 自定义参数
}

/**
 * 元素样式，文字是没有宽高的
 */
export interface ElementStyle {
  width?: number;
  height?: number;
  rotation?: number;
  alpha: number;
  x?: number;
  y?: number;
}

export type ElementStyleType = keyof ElementStyle;

export interface EffectFrame {
  id: string;
  progress: number;
  params: Record<string, any>;
}

export interface EffectFilterItem {
  id: string;
  name: string;
  frames: EffectFrame[];
}

// 裁剪
export interface CropSize {
  x: number;
  y: number;
  width: number;
  height: number;
}

// transform参数
export interface Transform {
  translateX?: number;
  translateY?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
}

// 2D帧动画
export interface AnimationFrame {
  id: string; // 唯一表示
  progress: number; // 进度
  transform: Transform; // transform变化
  ease?: string; // 缓动函数
  alpha?: number; // 透明度变化
  width?: number; // 宽
  height?: number; // 高
  _dirty: string; // 待定字段
  // easing?: string; // 缓动函数 'Quadratic.InOut' https://tweenjs.github.io/tween.js/examples/03_graphs.html
}

/**
 * 动画元素
 */
export interface AnimationItem {
  id: string;
  oid: string; // 原始数据ID
  type: AnimationType;
  name: string;
  ename: string; // 英文
  start: number; // 动画开始时间
  duration: number; // 动画总时间
  frames: AnimationFrame[]; // 帧数据
  ease?: string; // 缓动函数
  _dirty?: string;
}

// 元素蒙版本质上是一张黑色背景白色元素的图片， 蒙版默认的样式
export interface ElementMask extends ElementStyle {
  resourceId: string;
  name: string;
  blur: number; // 羽化半径
}

// 帧动画
export interface FrameItem {
  id: string;
  startTime: number;
  // 帧数据
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  alpha?: number;
  rotation?: number;
  // 遮罩动画
  maskX?: number;
  maskY?: number;
  maskWidth?: number;
  maskHeight?: number;
  maskBlur?: number;
  maskRotation?: number;
  maskAlpha?: number;
  // 强度参数
  intensity?: number;
  // 音量
  volume?: number;
  // 文字
  textScale?: number;
  textColor?: string | string[];
  textBgColor?: string;
  textBorderColor?: string;
  textGradientStops?: number[];
  // // 滤镜相关
  // saturation?: number; // 饱和度
  // tint?: number; // 色调
  // hue?: number; // 色相
  // brightness?: number; // 亮度
  // exposure?: number; // 曝光
  // contrast?: number; // 对比度
  // highlights?: number; // 高光
  // sharpen?: number; // 锐化
  // clarity?: number; // 清晰
  // smooth?: number; // 光滑
  // blur?: number; // 模糊
  // grain?: number; // 噪点
  // vignetteWhite?: number; // 白色光晕
  // vignetteBlack?: number; // 黑色光晕
  // fill?: number; // 调色
}
export type FrameKey = keyof FrameItem;

// 下划线参数只在编辑的时候有用
export interface BaseElement {
  id: string; // 唯一标识
  _dirty: string; // 用于控制元素内部更新，如果变化了，会触发组件更新
  _animationDirty?: string; // 用于重置动画的
  _frameDirty?: string; // 用于帧动画重置
  _noControl?: boolean; // 无控制器
  _filtersDirty?: string; // 用于触发filters更新的
  _ratio?: number; // 记录宽高比，编辑器中用到的参数
  _elementTimeLineTrackTop?: number; // 时间轴上的临时参数
  _elementTimeLineTrackHeight?: number; // 时间轴上的临时参数
  groupId?: string; // 根据ID进行分组，只支持一级分组
  scale?: number; // 缩放比例，默认是1
  desc?: string; // 描述信息
  sceneIndex?: number; // 模版场景的编号
  templateEnable?: boolean; // 模版模式下可修改（替换）的元素
  filters?: Array<Filter>; // 滤镜 不显示的元素是没有filters的
  frames?: Array<FrameItem>; // 帧动画参数
  controlUnKeepRatio?: boolean; // 控制器不保持等比缩放
  name: string; // 图层名称
  duration: number; // 持续时间，实际时间 = duration * speed;
  startTime: number; // 开始播放时间
  type: ElementType; // 类型
  trackIndex: number; // 层级，可以是小数 比如 trackIndex 如果需要在 0 和 1插入新的轨道，新的轨道trackIndex可以是 0.5，所以trackIndex不可以是0，如果trackIndex是-1表示主轨道
  extend?: any; // 扩展字段
}

/**
 * 视频数据
 */
export interface VideoElement extends BaseElement {
  resourceId: string;
  volume: number;
  muted: boolean;
  speed: number; // 默认是1
  curveSpeed?: boolean; // 是否是曲线变速
  curveSpeedLines?: { x: number; y: number; id: string }[]; // 曲线变速的参数
  curveSpeedName?: string; // 曲线变速预设名称
  clipTime: number; // 截取开始时间，默认是0
  style: ElementStyle;
  sampleVideo?: {
    clipTime: number;
    duration: number;
    url: string;
  }; // 示例视频
  blendMode: PIXI.BLEND_MODES; // 混合模式
  cropSize?: CropSize; // 裁剪
  matting: {
    // 抠像
    enabled: boolean; // 是否启用
    color?: string; // 扣掉的颜色
    similarityThreshold?: number; // 抠图颜色范围 0.0-2.0 值越大：相似颜色的扣除范围越大，更多相似颜色会被透明化
    emergence?: number; // 羽化强度
  };
  separate: 0 | 1; // 音视频分离，默认是0未分离，1表示分离
  fadeInTime: number; // 淡入n秒
  fadeOutTime: number; // 淡出n秒
  flipx: boolean; // 是否镜像翻转
  animates?: AnimationItem[];
  mask?: ElementMask; // 蒙版
}

/**
 * 组元素
 */
export interface GroupElement extends BaseElement {
  style: ElementStyle;
  animates?: AnimationItem[];
  children: BaseElement[]; // 子元素
  flipx: boolean; // 是否镜像翻转
  mask?: ElementMask; // 蒙版
}

/**
 * 遮罩是全局的
 */
export interface MaskElement extends BaseElement {
  resourceId: string;
  style: ElementStyle;
  animates?: AnimationItem[];
  mask?: ElementMask; // 蒙版
}

/**
 * audio 音频
 */
export interface AudioElement extends BaseElement {
  resourceId: string;
  volume: number; // 音量
  muted: boolean; // 是否静音
  speed: number; // 默认是1
  curveSpeed?: boolean; // 是否是曲线变速
  curveSpeedLines?: { x: number; y: number; id: string }[]; // 曲线变速的参数
  curveSpeedName?: string; // 曲线变速预设名称
  clipTime: number; // 截取开始时间，默认是0
  fadeInTime: number; // 淡入n秒
  fadeOutTime: number; // 淡出n秒
}

/**
 * Lottie动画
 */
export interface LottieElement extends BaseElement {
  resourceId: string; // 资源id
  blendMode: PIXI.BLEND_MODES; // 混合模式
  style: ElementStyle;
  flipx: boolean; // 是否镜像翻转
  filters?: Array<Filter>; // 滤镜 滤镜元素是没有filters的
  animates?: AnimationItem[];
  mask?: ElementMask; // 蒙版
  cropSize?: CropSize; // 裁剪，相对于原始尺寸进行裁剪
  initStartFrame: number; // 初始化开始帧
  lottieSpeed: number; // 播放速度
  // replaceText:
}

export interface EffectCanvasElement extends BaseElement {
  blendMode: PIXI.BLEND_MODES; // 混合模式
  style: ElementStyle; // 主要是透明度
  jscript: string; // js脚本地址
  params?: Record<string, any>; // 自定义参数
}

/**
 * 图片 type: image
 */
export interface ImageElement extends BaseElement {
  resourceId: string;
  blendMode: PIXI.BLEND_MODES; // 混合模式
  style: ElementStyle;
  flipx: boolean; // 是否镜像翻转
  fps?: number; // gif图会有fps参数
  filters?: Array<Filter>; // 滤镜 滤镜元素是没有filters的
  animates?: AnimationItem[];
  isGif?: boolean;
  mask?: ElementMask; // 蒙版
  cropSize?: CropSize; // 裁剪
  matting: {
    // 抠像
    enabled: boolean; // 是否启用
    color: string; // 扣掉的颜色
    similarityThreshold: number; // 抠图颜色范围 0.0-2.0 值越大：相似颜色的扣除范围越大，更多相似颜色会被透明化
    emergence: number; // 羽化强度
  };
}

/**
 * sticker 贴纸 和 image没什么区别
 */
export interface StickerElement extends ImageElement {}

/**
 * 文字元素, type: text
 */
export interface TextElement extends BaseElement {
  textScale?: number;
  text: string; // 字内容
  textStyle: Record<string, any>;
  textEnterAnimate?: AnimationItem; // 文字动画
  // textBgColor?: { r: number; g: number; b: number; a: number }; // 文字背景色
  _textStyleDirty?: string;
  style: ElementStyle;
  flipx: boolean; // 是否镜像翻转
  filters?: Filter[]; // 滤镜 滤镜元素是没有filters的
}

/**
 * 滤镜元素是全局的
 * lut滤镜参数
  lut: string; // 滤镜图片
  intensity: number; // 强度
 */
export interface FilterElement extends BaseElement {
  resourceId: string; // 滤镜图片URL
  intensity: number; // 强度
}

// 字幕
export interface CaptionElement extends TextElement {
  id: string;
  type: 'caption';
}

/**
 * 相机元素
 */
export interface CameraElement extends BaseElement {
  id: string;
  type: 'camera';
  style: ElementStyle;
}

// 动画类型
export type AnimationType = 'enter' | 'emphasize' | 'leave';

/**
 * 转场动画
 */
export interface TransitionItem {
  id: string; // 唯一标识
  _dirty: string; // 用于控制元素内部更新，如果变化了，会触发组件更新
  _lock?: boolean; // 用户操作的锁定
  _hidden?: boolean; // 用户操作的元素是否可见
  name: string; // 图层名称
  duration: number; // 持续时间，实际时间 = duration * speed;
  startElementId: string; // 开始执行动画的元素ID
  transitionName?: string; // 动画名称，如果存在就使用系统预设
  glslCoding?: string; // glsl动画代码
  paramsTypes?: Record<string, any>;
  defaultParams?: Record<string, any>;
  extend?: any; // 扩展字段
}

/**
 * 裁剪
 */
export interface Cropper {
  width: number;
  height: number;
  x: number;
  y: number;
  rotation?: number; // 旋转角度
}

/**
 * 背景兼容方式
 */
export type BackgroundSize = 'auto' | 'contain' | 'cover';

/**
 * 背景平铺
 */
export type BackgroundRepeat = 'no-repeat' | 'repeat-x' | 'repeat-y' | 'repeat';

/**
 * 背景
 */
export interface Background {
  disable?: boolean; // 启用禁用
  color?: string;
  cropper?: Cropper;
  resourceId?: string; // 背景图片ID
  backgroundRepeat?: BackgroundRepeat;
  backgroundSize?: BackgroundSize; // 默认是'auto'
}

/**
 * 历史记录
 */
export type RecordType = 'elements_delete' | 'elements_create' | 'elements_update' | 'global';

export type RecordMap = {
  elements_delete: (BaseElement | CameraElement | CaptionElement)[];
  elements_create: (BaseElement | CameraElement | CaptionElement)[];
  elements_update: (BaseElement | CameraElement | CaptionElement)[];
  global: MovieData;
};

export interface RecordItem<T> {
  desc: string; // 描述信息
  type: T;
  data?: T extends keyof RecordMap ? RecordMap[T] : never; // 历史数据可以存放任何数据
  selecteds?: string[]; // 操作记录
  mdata?: MovieData;
}

export interface RecordManager {
  add: (item: RecordItem<RecordType>) => void;
  debounceAdd: (item: RecordItem<RecordType>) => void;
  redo: () => void;
  undo: () => void;
  manager: any;
}

// 使用中的媒体资源
export interface UsedMediaItem {
  resourceId: string;
  startTime: number;
  duration: number;
  clipTime: number;
  volume: number; // 音量
  speed: number;
  muted: boolean;
}

export interface PluginConfig {
  type: string; // 元素类型，也是唯一标识，比如：image，video，audio，effect...
  name: string; // 元素的名称，比如：图片，视频，音频...
  version: string; // 版本号
  Element: React.FC; // 元素组件
  ElementData: new (n: any) => BaseElement; // 创建元素的数据类
  Options?: React.FC; // 设置区域组件
}
