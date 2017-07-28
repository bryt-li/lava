import React from 'react';
import PropTypes from 'prop-types';
import {
  TabBar,Icon
} from 'antd-mobile';
import {
  connect
} from 'dva';
import {
  routerRedux
} from 'dva/router';

import styles from './index.less';

function Footer({
  dispatch, childrens, location
}) {
  return (
    <div className={styles.normal}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={false}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={(<Icon type="#icon-jingpaicaigoushang"/>)}
          selectedIcon={(<Icon type="#icon-jingpaicaigoushang" />)}
          selected={location.pathname === '/'}
          badge={1}
          onPress={() => dispatch(routerRedux.push('/'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="活力圈子"
          key="活力圈子"
          icon={(<Icon type="#icon-iconfontyundonghuwai" />)}
          selectedIcon={(<Icon type="#icon-iconfontyundonghuwai" />)}
          selected={location.pathname === '/circle'}
          onPress={() => dispatch(routerRedux.push('/page01'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="火山爆发"
          key="火山爆发"
          icon={(<Icon type="#icon-vip" />)}
          selectedIcon={(<Icon type="#icon-vip" />)}
          selected={location.pathname === '/burst'}
          onPress={() => dispatch(routerRedux.push('/burst'))}
        >
          {childrens}
        </TabBar.Item>
        <TabBar.Item
          title="品牌"
          key="品牌"
          icon={(<Icon type="#icon-wxbpinpaibao" />)}
          selectedIcon={(<Icon type="#icon-wxbpinpaibao" />)}
          selected={location.pathname === '/brand'}
          onPress={() => dispatch(routerRedux.push('/brand'))}
        >
          {childrens}
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  childrens: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Footer);
