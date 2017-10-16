/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';

import InputTag from './';
import * as Widget from '../consts/Widget';

const InputDemo = () => {

  return [<Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="1">
    <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
              value={['a', 'b', 'c',]}/>
  </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="2">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={['abcdeddfasdddfadasf', 'b', 'c',]}/>
    </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="3">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={['12345678901234', 'b', 'c',]}/>
    </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="4">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={['123456789012345676890780',]}/>
    </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="5">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={['123456789012345676890780', 'b', 'c',]}/>
    </Theme>,
    <div key="6">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={['123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', '123456789012345676890780', 'b', 'c',]}/>
    </div>,];
};
export default InputDemo;
