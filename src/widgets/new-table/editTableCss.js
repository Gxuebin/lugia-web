//@flow
import * as React from 'react';
import type { TableProps } from './tableCss';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getBorder } from '@lugia/theme-utils';

import colorsFunc from '../css/stateColor';
const { themeColor, borderSize, disableColor } = colorsFunc();

export type EditTableProps = TableProps & {
  dataType?: string,
  showAddCol?: boolean,
  showAddRow?: boolean,
  isEditHead?: boolean,
  onChange: Function,
  onCell: Function,
  customContainerElement: any,
  customEditElement: any,
  selectSuffixElement: any,
};

export type EditTableState = {
  selectCell: Array<Object>,
  editCell: Object,
  editing: boolean,
};

export type Direction = 'left' | 'right' | 'top' | 'bottom';

export const Container = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [['width'], ['height']],
  },
});

export const EditDiv = CSSComponent({
  tag: 'div',
  className: 'EditDiv',
  normal: {
    selectNames: [['width'], ['height'], ['border'], ['background']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { isSelect, isHead },
      } = themeProps;
      const editBorderColor = isSelect ? themeColor : 'transparent';
      const backgroundColor = isHead ? disableColor : 'transparent';
      return {
        border: getBorder({ color: editBorderColor, width: borderSize, style: 'solid' }),
        background: { color: backgroundColor },
      };
    },
  },
  css: `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;`,
});

export const InnerTriggerDiv = StaticComponent({
  tag: 'div',
  className: 'InnerTriggerDiv',
  css: `
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);`,
});