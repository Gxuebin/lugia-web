/**
 * by wangcuixia
 * @flow
 * **/

import changeColor from './utilsColor';

type StateColor = {
  normalColor: string,
  hoverColor: string,
  mouseDownColor: string,
  disabledColor: string,
  spiritColor: string,
  disabledSpiritBackgroundColor: string,
  disabledSpiritFontAndBorderColor: string,
};
type Theme = {
  themeColor?: string,
  successColor?: string,
  warningColor?: string,
  dangerColor?: string,
  blackColor?: string,
  darkGreyColor?: string,
  mediumGreyColor?: string,
  lightGreyColor?: string,
  superLightColor?: string,
  disableColor?: string,
  defaultColor?: string,
  borderColor?: string,
  borderDisableColor?: string,
  borderSize?: string,
  boxShadowOpacity?: string,
  hShadow?: string,
  vShadow?: string,
  shadowSpread?: string,
  borderRadius?: string,
  circleBorderRadius?: string,
  transitionTime?: string,
  rulesColor?: string,
  rulesSize?: string,
  rulesOpacity?: string,
  padding?: string,
  paddingToText?: string,
  marginToSameElement?: string,
  marginToDifferentElement?: string,
  marginToPeerElementForY?: string,
  marginToSameElementForY?: string,
  marginToSonElement?: string,
};
const CommonStyle = {
  themeColor: '#684fff', //主题色
  successColor: '#56c22d', //成功色
  warningColor: '#f8ac30', //警告色
  dangerColor: '#f22735', //危险色
  blackColor: '#333333', //黑色
  darkGreyColor: '#666666', //深灰色
  mediumGreyColor: '#999999', //中灰色
  lightGreyColor: '#cccccc', //浅灰色
  superLightColor: '#e8e8e8', //超浅色
  disableColor: '#f2f2f2', //禁止色
  defaultColor: '#ffffff', //默认白色色
  borderColor: '#cccccc', //边框色
  borderDisableColor: '#e8e8e8', //边框禁止色
  borderSize: '1px', //边框大小
  boxShadowOpacity: '20%', //边框透明度
  hShadow: '0', //边框水平偏移值（X）
  vShadow: '0', //边框竖直偏移值（Y）
  shadowSpread: '6px', //边框大小
  borderRadius: '4px', //圆角通用
  circleBorderRadius: '50%', //圆角-特殊
  transitionTime: '0.3s', //过渡时间
  rulesColor: '#fff', //分割线颜色
  rulesSize: '1px', //分割线大小
  rulesOpacity: '40%', //分割线透明度
  padding: '10px', //元素左右padding
  paddingToText: '6px', //文字到元素的距离
  marginToSameElement: '10px', //同级元素与元素之间距离
  marginToDifferentElement: '30px', //元素组之间距离
  marginToPeerElementForY: '10px', //同级元素竖向间距
  marginToSameElementForY: '6px', //竖向文字到元素距离
  marginToSonElement: '16px', //主从关系元素间距
};
export function changeStyle(theme: Theme) {
  CommonStyle.themeColor = theme.themeColor || CommonStyle.themeColor;
  CommonStyle.successColor = theme.successColor || CommonStyle.successColor;
  CommonStyle.warningColor = theme.warningColor || CommonStyle.warningColor;
  CommonStyle.dangerColor = theme.dangerColor || CommonStyle.dangerColor;
  CommonStyle.blackColor = theme.blackColor || CommonStyle.blackColor;
  CommonStyle.darkGreyColor = theme.darkGreyColor || CommonStyle.darkGreyColor;
  CommonStyle.mediumGreyColor = theme.mediumGreyColor || CommonStyle.mediumGreyColor;
  CommonStyle.lightGreyColor = theme.lightGreyColor || CommonStyle.lightGreyColor;
  CommonStyle.superLightColor = theme.superLightColor || CommonStyle.superLightColor;
  CommonStyle.disableColor = theme.disableColor || CommonStyle.disableColor;
  CommonStyle.defaultColor = theme.defaultColor || CommonStyle.defaultColor;
  CommonStyle.borderColor = theme.borderColor || CommonStyle.borderColor;
  CommonStyle.borderDisableColor = theme.borderDisableColor || CommonStyle.borderDisableColor;
  CommonStyle.borderSize = theme.borderSize || CommonStyle.borderSize;
  CommonStyle.boxShadowOpacity = theme.boxShadowOpacity || CommonStyle.boxShadowOpacity;
  CommonStyle.hShadow = theme.hShadow || CommonStyle.hShadow;
  CommonStyle.vShadow = theme.vShadow || CommonStyle.vShadow;
  CommonStyle.shadowSpread = theme.shadowSpread || CommonStyle.shadowSpread;
  CommonStyle.borderRadius = theme.borderRadius || CommonStyle.borderRadius;
  CommonStyle.circleBorderRadius = theme.circleBorderRadius || CommonStyle.circleBorderRadius;
  CommonStyle.transitionTime = theme.transitionTime || CommonStyle.transitionTime;
  CommonStyle.rulesColor = theme.rulesColor || CommonStyle.rulesColor;
  CommonStyle.rulesSize = theme.rulesSize || CommonStyle.rulesSize;
  CommonStyle.rulesOpacity = theme.rulesOpacity || CommonStyle.rulesOpacity;
  CommonStyle.padding = theme.padding || CommonStyle.padding;
  CommonStyle.paddingToText = theme.paddingToText || CommonStyle.paddingToText;
  CommonStyle.marginToSameElement = theme.marginToSameElement || CommonStyle.marginToSameElement;
  CommonStyle.marginToDifferentElement =
    theme.marginToDifferentElement || CommonStyle.marginToDifferentElement;
  CommonStyle.marginToPeerElementForY =
    theme.marginToPeerElementForY || CommonStyle.marginToPeerElementForY;
  CommonStyle.marginToSameElementForY =
    theme.marginToSameElementForY || CommonStyle.marginToSameElementForY;
  CommonStyle.marginToSonElement = theme.marginToSonElement || CommonStyle.marginToSonElement;
}

export function colorsFactory(changeColor: Function) {
  const func = (themeColor: string): StateColor => {
    if (!themeColor) {
      themeColor = CommonStyle.themeColor;
    }
    return {
      normalColor: changeColor(themeColor).color,
      hoverColor: changeColor(themeColor, 20).color,
      mouseDownColor: changeColor(themeColor, 0, 20).color,
      disabledColor: changeColor(themeColor, 45).color,
      spiritColor: changeColor(themeColor, 0, 0, 5).rgba,
      disabledSpiritBackgroundColor: changeColor(themeColor, 0, 0, 1.5).rgba,
      disabledSpiritFontAndBorderColor: changeColor(themeColor, 0, 0, 30).rgba,
      ...CommonStyle,
    };
  };
  func.__changeColor__ = changeColor;
  return func;
}

const colorsFunc = colorsFactory(changeColor);
export default colorsFunc;
