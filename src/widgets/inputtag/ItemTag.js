/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import { ItemMarginRight, ItemPaddingLeft, ItemPadingRight, } from './style';
import { RadiusSize, } from '../css/input';

export const ItemContainer = styled.li`
  margin-top: 3px;
  height: 20px;
  line-height: 20px;
  user-select: none;
  background: #f3f3f3;
  border-radius: ${RadiusSize};
  color: rgba(0, 0, 0, 0.65);
  cursor: default;
  float: left;
  margin-right: ${ItemMarginRight}px;
  position: relative;
  overflow: hidden;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 ${(props: Object) => ( props.closeable ? ItemPadingRight : ItemPaddingLeft)}px 0 ${ItemPaddingLeft}px;
`;

export const ItemText = styled.span`
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
`;