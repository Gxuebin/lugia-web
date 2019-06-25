/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import { TabType, TabPositionType, CardMarginRight } from '../css/tabs';
import { getTitlePadding } from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import Icon from '../icon';
import { isVertical, matchType } from './utils';
import { ObjectUtils } from '@lugia/type-utils';

import CSSComponent, { css, keyframes, getBorder } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { addMouseEvent } from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import { findDOMNode } from 'react-dom';

const { themeColor, mediumGreyColor, superLightColor, disableColor } = colorsFunc();

const BaseTabHoc = CSSComponent({
  tag: 'div',
  className: 'BaseTab',
  normal: {
    selectNames: [['color'], ['background'], ['border'], ['margin']],
    getCSS: (theme: Object, themeProps: Object) => {
      const { color } = theme;
      const {
        propsConfig: { isSelect, tabType, tabPosition },
      } = themeProps;
      let display = 'inline-block';
      let padding = 'padding: 0 10px 0 20px;';
      let textAlign = 'text-align: center';
      if (isVertical(tabPosition)) {
        display = 'block';
        padding = 'padding: 0 20px; ';
        if (tabPosition === 'left') {
          textAlign = 'text-align: right';
        } else {
          textAlign = 'text-align: left';
        }
      }
      if (isSelect && tabType === 'line') {
        let cssString = css`
          width: 100%;
          height: 2px;
          left: 50%;
          animation: ${addWidth} 0.2s linear forwards;
          transform: translateX(-50%);
        `;
        let pos = tabPosition === 'top' ? 'bottom: -1px;' : 'top: -1px;';
        if (isVertical(tabPosition)) {
          pos = tabPosition === 'left' ? 'right: -21px;' : 'left: -21px;';
          cssString = css`
            width: 2px;
            height: 100%;
            top: 50%;
            animation: ${addHeight} 0.2s linear forwards;
            transform: translateY(-50%);
          `;
        }
        return css`
          display: ${display};
          ${textAlign}
          ${padding}
          & > div::before {
            content: '';
            background: ${color || themeColor};
            border-radius: 2px;
            position: absolute;
            ${pos}
            ${cssString}
          }
        `;
      }
      return css`
        display: ${display};
        ${padding}
        ${textAlign}
      `;
    },
  },
  hover: {
    selectNames: [['color'], ['background']],
    defaultTheme: {
      color: themeColor,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabType },
      } = themeProps;
      let cssString = `
        & > span {
          opacity: 1;
        }
       
      `;
      if (tabType === 'card') {
        cssString += ` & > div.cardTitle {
          transition: all 0.3s linear;
          transform: translateX(-3px);
        }`;
      }
      return css`
        ${cssString}
      `;
    },
  },
  disabled: {
    selectNames: [],
    defaultTheme: {
      cursor: 'not-allowed',
      color: '#999',
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { color } = theme;
      return css`
        color: ${color || '#999'};

        & > div.lineTitle::before {
          content: '';
          width: 0;
          height: 0;
        }
        & > div.cardTitle {
          transition: none;
          transform: none;
        }
      `;
    },
  },
  css: css`
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    padding: 0 10px 0 20px;
  `,
});

const BaseTab = ThemeHoc(
  class extends React.Component<any, any> {
    render() {
      const {
        tabType,
        isSelect,
        tabPosition,
        themeProps,
        children,
        onClick,
        onMouseEnter,
        onMouseLeave,
      } = this.props;
      themeProps.propsConfig = { tabType, isSelect, tabPosition };
      return (
        <BaseTabHoc
          onClick={onClick}
          {...addMouseEvent(this, { enter: onMouseEnter, leave: onMouseLeave })}
          themeProps={themeProps}
          className={'BaseTab'}
        >
          {children}
        </BaseTabHoc>
      );
    }
  },
  'BaseTab',
  { hover: true, active: false }
);

const addWidth = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
`;

const addHeight = keyframes`
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
`;

const Title = CSSComponent({
  tag: 'div',
  className: 'TitleLine',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 34,
      lineHeight: 34,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}px` : '3.4rem',
      };
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableColor,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
    &:focus {
      color: ${themeColor};
    }
  `,
});

const CardTitle = CSSComponent({
  tag: 'div',
  className: 'TitleCard',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 34,
      lineHeight: 34,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}px` : '34px',
      };
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableColor,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
    text-align: left;
    &:focus {
      color: ${themeColor};
    }
  `,
});

const TabIcon = CSSComponent({
  extend: Icon,
  className: 'TabIcon',
  css: css`
    vertical-align: text-bottom !important;
    display: inline-block;
  `,
  normal: {
    selectNames: [['color']],
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableColor,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      return 'cursor: not-allowed';
    },
  },
});

const IconContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    display: inline-block;
    height: 12px;
    width: 12px;
  `,
  normal: {
    selectNames: [['color']],
  },
  disabled: {
    selectNames: [],
  },
});

const ClearButtonContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    transition: all 0.3s linear 0.1s;
    z-index: 2;
    opacity: 0;
    color: #999;
  `,
  normal: {
    selectNames: [],
    getCSS: (a, themeProps) => {
      const {
        propsConfig: { tabType },
      } = themeProps;
      if (tabType !== 'card') {
        return 'opacity: 1;margin-left:10px;';
      }
    },
  },
  hover: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
});

const ClearIcon = ThemeHoc(
  CSSComponent({
    extend: Icon,
    className: 'ClearIcon',
    css: css`
      font-size: 1rem;
    `,
    normal: {
      selectNames: [['color']],
      defaultTheme: {
        color: '#e8e8e8',
      },
    },
    hover: {
      selectNames: [['color']],
      defaultTheme: {
        color: mediumGreyColor,
      },
    },
    disabled: {
      selectNames: [['cursor']],
      getCSS: (theme: Object, themeProps: Object) => {
        return 'cursor: not-allowed';
      },
    },
  }),
  'ClearIcon',
  { hover: true, active: false }
);

ClearIcon.displayName = 'deleteIcon';

type TabpaneState = {
  iconClass: string,
};

type TabpaneProps = {
  title: string,
  onDeleteClick?: Function,
  icon?: string,
  suffixIcon?: string,
  tabType?: TabType,
  tabPosition?: TabPositionType,
  activityValue?: string,
  isSelect?: boolean,
  disabled?: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  getTabpaneWidthOrHeight?: Function,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};

class Tabpane extends Component<TabpaneProps, TabpaneState> {
  static defaultProps = {};
  static displayName = Widget.Tabpane;
  tabpane: any;
  offsetSize: number;

  constructor(props: TabpaneProps) {
    super(props);
    this.tabpane = React.createRef();
    this.offsetSize = 0;
  }

  static getDerivedStateFromProps(nextProps: TabpaneProps, state: TabpaneState) {
    if (!state) {
      return {
        iconClass: 'lugia-icon-reminder_close',
      };
    }
  }

  render() {
    return this.getHTabPane();
  }

  getHTabPane() {
    const { title, tabType, tabPosition, isSelect, icon, suffixIcon, disabled } = this.props;

    const {
      tabThemeProps: { viewClass, theme },
      titleThemeProps,
    } = this.getHTabPaneThemeProps(tabType, isSelect);

    let Target = (
      <BaseTab
        theme={theme}
        viewClass={viewClass}
        disabled={disabled}
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        tabPosition={tabPosition}
        ref={this.tabpane}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {tabType === 'line' ? (
          <Title
            className={'lineTitle'}
            themeProps={titleThemeProps}
            hasPreIcon={this.getTabIconContainer(icon, titleThemeProps) !== null}
            hasSuffixIcon={this.getTabIconContainer(suffixIcon, titleThemeProps) !== null}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, titleThemeProps)}
            {title}
            {this.getTabIconContainer(suffixIcon, titleThemeProps, 'suffix')}
          </Title>
        ) : (
          <CardTitle
            className={'cardTitle'}
            themeProps={titleThemeProps}
            hasPreIcon={this.getTabIconContainer(icon, titleThemeProps) !== null}
            hasSuffixIcon={this.getTabIconContainer(suffixIcon, titleThemeProps) !== null}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, titleThemeProps)}
            {title}
            {this.getTabIconContainer(suffixIcon, titleThemeProps, 'suffix')}
          </CardTitle>
        )}

        {this.getClearButton()}
      </BaseTab>
    );
    if (matchType(tabType, 'line') && isVertical(tabPosition)) {
      Target = (
        <BaseTab
          theme={theme}
          viewClass={viewClass}
          disabled={disabled}
          tabType={tabType}
          onClick={this.handleClick}
          tabPosition={tabPosition}
          isSelect={isSelect}
          ref={this.tabpane}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <Title
            className={'lineTitle'}
            themeProps={titleThemeProps}
            hasPreIcon={this.getTabIconContainer(icon, titleThemeProps) !== null}
            hasSuffixIcon={this.getTabIconContainer(suffixIcon, titleThemeProps) !== null}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, titleThemeProps)}
            {title}
          </Title>
        </BaseTab>
      );
    }
    return Target;
  }

  getHTabPaneThemeProps(tabType: string, isSelect: boolean) {
    let titleThemeProps = this.props.getPartOfThemeProps('DefaultTabPan');
    const { props } = this;
    const targetObj = { themeConfig: { normal: { ...getTitlePadding(props) } } };
    titleThemeProps = deepMerge(targetObj, titleThemeProps);

    const { viewClass, theme } = this.props.getPartOfThemeHocProps('DefaultTabPan');
    let themeRes = theme;
    switch (tabType) {
      case 'card':
        const borderInfo = { color: superLightColor, width: 1, style: 'solid' };
        const border = getBorder({ ...borderInfo }, { radius: 4, radiusDirections: ['tl', 'tr'] });
        const cardDefault = {
          themeConfig: {
            normal: {
              background: { color: '#f8f8f8' },
              margin: { right: CardMarginRight },
              border,
            },
          },
        };
        const cardThemeProps = deepMerge(cardDefault, this.props.getPartOfThemeProps('CardTabPan'));

        const cardTabThemeProps = deepMerge({ themeConfig: theme[viewClass] }, cardThemeProps);
        themeRes = { [viewClass]: cardTabThemeProps.themeConfig };

        break;
      case 'window':
        const windowBorder = getBorder(
          { border: 'none' },
          { radius: 4, radiusDirections: ['tl', 'tr'] }
        );
        const windowDefault = {
          themeConfig: {
            normal: { background: { color: '#ffffff' }, border: windowBorder },
          },
        };
        const windowThemeProps = deepMerge(
          windowDefault,
          this.props.getPartOfThemeProps('WindowTabPan')
        );
        const windowTabThemeProps = deepMerge({ themeConfig: theme[viewClass] }, windowThemeProps);
        themeRes = { [viewClass]: windowTabThemeProps.themeConfig };
        break;
      default:
        break;
    }

    if (isSelect) {
      titleThemeProps = deepMerge(
        { themeConfig: { ...titleThemeProps.themeConfig } },
        this.props.getPartOfThemeProps('SelectTabPan')
      );
      const windowThemeProps = deepMerge(
        { themeConfig: themeRes[viewClass] },
        this.props.getPartOfThemeProps('SelectTabPan')
      );
      themeRes = { [viewClass]: windowThemeProps.themeConfig };
    }

    titleThemeProps.propsConfig = { tabType, isSelect };
    return { tabThemeProps: { viewClass, theme: themeRes }, titleThemeProps };
  }

  componentDidMount() {
    this.getContainerWidth();
  }

  handleClick = () => {
    const { activityValue, onClick, disabled } = this.props;
    if (!disabled) onClick && onClick(activityValue);
  };

  getTabIconContainer(icon: ?string, themeProps?: Object = {}, type?: string) {
    return icon ? (
      <IconContainer themeProps={themeProps}>{this.getIcon(icon, themeProps)}</IconContainer>
    ) : null;
  }
  getIcon(icon: string, themeProps: Object) {
    const { isSelect, disabled } = this.props;
    if (ObjectUtils.isString(icon)) {
      return (
        <TabIcon themeProps={themeProps} isSelect={isSelect} iconClass={icon} disabled={disabled} />
      );
    }
    return icon;
  }
  onDeleteClick = (e: Event) => {
    const { onDeleteClick, activityValue } = this.props;
    onDeleteClick && onDeleteClick(e, activityValue);
  };
  getClearButton() {
    const { tabType, themeProps, disabled } = this.props;
    const { iconClass } = this.state;
    const cBtnthemeProps = deepMerge({ propsConfig: { tabType } }, themeProps);
    const { theme, viewClass } = this.props.getPartOfThemeHocProps('DefaultTabPan');
    if (!matchType(tabType, 'line')) {
      return (
        <ClearButtonContainer
          themeProps={cBtnthemeProps}
          onMouseEnter={this.clearButtonMouseEnter}
          onMouseLeave={this.clearButtonMouseLeave}
          onClick={this.onDeleteClick}
          tabType={tabType}
        >
          <ClearIcon
            theme={theme}
            viewClass={viewClass}
            iconClass={iconClass}
            disabled={disabled}
          />
        </ClearButtonContainer>
      );
    }
    return null;
  }
  clearButtonMouseEnter = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close_circle' });
  };
  clearButtonMouseLeave = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close' });
  };
  onMouseEnter = (e: Object) => {
    const { onMouseEnter, activityValue } = this.props;
    onMouseEnter && onMouseEnter(activityValue);
  };
  onMouseLeave = (e: Object) => {
    const { onMouseLeave, activityValue } = this.props;
    onMouseLeave && onMouseLeave(activityValue);
  };
  getContainerWidth() {
    if (this.tabpane) {
      const { tabPosition } = this.props;
      if (isVertical(tabPosition)) {
        this.offsetSize = findDOMNode(this.tabpane.current).offsetHeight;
      } else {
        this.offsetSize = findDOMNode(this.tabpane.current).offsetWidth;
      }
    }
    const { getTabpaneWidthOrHeight } = this.props;
    getTabpaneWidthOrHeight && getTabpaneWidthOrHeight(this.offsetSize);
  }
}

export default Tabpane;
