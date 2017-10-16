/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';

type ProviderComponent = React.ComponentType<any> & { displayName: ?string };
const ThemeProvider = (Target: ProviderComponent, widgetName: string): Function => {

  class ThemeWrapWidget extends React.Component<any, any> {
    target: Object;

    render () {
      const getTheme = () => {
        const { config = {}, } = this.context;
        const { viewClass = widgetName, } = this.props;
        const result = config[ viewClass ];
        return result ? result : {};
      };
      Target.displayName = `ThemeWrapWidget[${widgetName}]`;
      return <Target {...this.props} getTheme={getTheme} ref={cmp => this.target = cmp}></Target>;
    }
  }


  ThemeWrapWidget.contextTypes = {
    config: PropTypes.object,
  };
  ThemeWrapWidget.displayName = 'ThemeWrapWidget';
  return ThemeWrapWidget;
};
export default ThemeProvider;
