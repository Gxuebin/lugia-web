/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { AffixProps, AffixState } from '../css/affix';
import { Affix } from '../css/affix';
import { getElementPosition } from '../utils';

function getScrollTop(): ?number {
  let scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset;
  } else if (document.compatMode && document.compatMode != 'BackCompat') {
    scrollPos = document.documentElement && document.documentElement.scrollTop;
  } else if (document.body) {
    scrollPos = document.body.scrollTop;
  }
  return scrollPos;
}
const OffsetBottom = 'offsetBottom';
const OffsetTop = 'offsetTop';

export default class extends React.Component<AffixProps, AffixState> {
  affix: any;
  defaultOffsetTop: number;
  targetDefaultOffsetTop: number;
  constructor() {
    super();
    this.state = {
      fixed: false,
    };
  }
  componentDidMount() {
    const { target } = this.props;
    this.defaultOffsetTop = this.affix && getElementPosition(this.affix).y;
    setTimeout(() => {
      if (target && typeof target === 'function') {
        this.targetDefaultOffsetTop = target() && getElementPosition(target()).y;
        target().addEventListener('scroll', this.addTargetListener);

        return;
      }
      window.addEventListener('scroll', this.addWindowListener);
    }, 100);
  }
  addWindowListener = () => {
    const { offsetTop = 0, offsetBottom = 0 } = this.props;
    const winHeight = window.innerHeight;
    const scrollTop = getScrollTop() || 0;
    const affixTop = this.affix && getElementPosition(this.affix).y;
    const defaultTop = this.defaultOffsetTop;

    this.setFixedForWin({
      offsetTop,
      offsetBottom,
      winHeight,
      scrollTop,
      affixTop,
      defaultTop,
    });
  };
  addTargetListener = () => {
    const {
      offsetTop = 0,
      offsetBottom = 0,
      target = (): Object => {
        return {};
      },
    } = this.props;
    const affixTop = this.affix && getElementPosition(this.affix).y;
    const winHeight = window.innerHeight;
    const targetTop = this.affix && getElementPosition(target()).y;
    const targetScroll = target().scrollTop;
    const targetRect = target().getBoundingClientRect();
    const targetHeight = target().offsetHeight;

    this.setFixedForTarget({
      affixTop,
      targetTop,
      targetScroll,
      offsetTop,
      winHeight,
      offsetBottom,
      targetRect,
      targetHeight,
    });
  };

  setFixedForWin = (param: Object) => {
    const { offsetTop, offsetBottom, winHeight, scrollTop, affixTop, defaultTop } = param;
    const type = this.getOffsetType();
    switch (type) {
      case OffsetTop:
        if (affixTop - scrollTop <= offsetTop) {
          this.setState({
            fixed: true,
            offset: offsetTop,
          });
        }

        if (defaultTop - scrollTop > offsetTop) {
          this.setState({
            fixed: false,
          });
        }
        break;
      case OffsetBottom:
        const nowOffsetTop = this.affix && getElementPosition(this.affix).y;
        const affixHeight = this.affix && this.affix.offsetHeight;
        if (winHeight + scrollTop - nowOffsetTop - affixHeight <= offsetBottom) {
          this.setState({
            fixed: true,
            offset: offsetBottom,
          });
        }
        if (scrollTop + winHeight >= defaultTop + affixHeight) {
          this.setState({
            fixed: false,
          });
        }
        break;
      default:
    }
  };
  setFixedForTarget(param: Object) {
    const {
      affixTop,
      targetTop,
      targetScroll,
      offsetTop,
      winHeight,
      offsetBottom,
      targetRect,
      targetHeight,
    } = param;
    const type = this.getOffsetType();
    switch (type) {
      case OffsetTop:
        if (affixTop - targetTop - targetScroll <= offsetTop) {
          this.setState({
            fixed: true,
            offset: offsetTop + targetRect.top,
          });
        }

        if (this.defaultOffsetTop - this.targetDefaultOffsetTop >= offsetTop + targetScroll) {
          this.setState({
            fixed: false,
          });
        }
        break;

      case OffsetBottom:
        const scrollTop = getScrollTop() || 0;
        const affixHeight = this.affix && this.affix.offsetHeight;
        const affixToWin = this.state.fixed ? affixTop : affixTop + affixHeight - scrollTop;
        if (affixToWin - targetTop - targetHeight + scrollTop - targetScroll <= offsetBottom) {
          this.setState({
            fixed: true,
            offset: winHeight - targetRect.bottom + offsetBottom,
          });
        }
        if (
          this.defaultOffsetTop - this.targetDefaultOffsetTop <=
          targetScroll + this.affix.offsetTop - targetRect.top
        ) {
          this.setState({
            fixed: false,
          });
        }

        break;
      default:
    }
  }

  getOffsetValue() {
    const { offset } = this.state;
    return {
      [this.getOffsetType()]: offset,
    };
  }

  getOffsetType = (): 'offsetBottom' | 'offsetTop' => {
    let res = OffsetTop;
    if (this.isInProps(OffsetTop)) {
      return res;
    }
    if (this.isInProps(OffsetBottom)) {
      res = OffsetBottom;
    }
    return res;
  };
  shouldComponentUpdate(nextProps: AffixProps, nextState: AffixState) {
    const { onChange } = this.props;
    if (nextState.fixed !== this.state.fixed) {
      onChange && onChange(nextState.fixed);
    }

    return true;
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.addWindowListener);
  }
  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    return (
      <Affix innerRef={node => (this.affix = node)} fixed={fixed} {...this.getOffsetValue()}>
        {children}
      </Affix>
    );
  }
  getOffsetType = (): 'offsetBottom' | 'offsetTop' => {
    let res = OffsetTop;
    if (this.isInProps(OffsetTop)) {
      return OffsetTop;
    }
    if (this.isInProps(OffsetBottom)) {
      res = OffsetBottom;
    }
    return res;
  };

  isInProps(value: 'offsetTop' | 'offsetBottom') {
    return value in this.props;
  }
}
