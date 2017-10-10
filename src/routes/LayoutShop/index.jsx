import React from 'react'
import { connect } from 'dva'
import { Link, routerRedux, Route, Switch } from 'dva/router'

import PropTypes from 'prop-types'
import { Modal, Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile'
import ReactLoading from 'react-loading'

const ShopCart = require('./ShopCart/');

const HomePage = require('../HomePage/');
const ItemPage = require('../ItemPage/');

import styles from './index.less'

class LayoutShop extends React.Component {

  constructor(props) {
      super(props);
  }

  render(){
    return (
      <div>
        <Switch>
          <Route path='/shop/home' component={HomePage} />
          <Route path='/shop/item/:type/:id' component={ItemPage} />
        </Switch>

        <div style={{display:'block',height:'200px'}} />
        <ShopCart />
      </div>
    )
  }//end render

}

LayoutShop.propTypes = {
};

const mapStateToProps = (state) => ({
  catalog: state.menu.catalog,
  total: state.menu.total,
  saving: state.menu.saving,
  item: state.LayoutShop.item,
});

export default connect(mapStateToProps)(LayoutShop);
