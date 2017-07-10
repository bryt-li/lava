import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import NProgress from 'nprogress'
import { Layout, Row, Col, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';
const { Header, Footer, Content } = Layout;

import styles from './index.less'

const TopMostBar = require('../../components/TopMostBar/');
const FooterInfo = require('../../components/FooterInfo/');


let lastHref

const LayoutShop = ({ children, location, dispatch, app, loading }) => {
  const href = window.location.href

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  return (
    <Layout>
      <TopMostBar />

      <Header className={styles.header}>
        this is header
      </Header>

      <Content className={styles.content}>
        {children}
      </Content>

      <Footer className={styles.footer}>
        <FooterInfo/>
      </Footer>
    </Layout>
  )
}

LayoutShop.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(LayoutShop)
