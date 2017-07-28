import React from 'react';
import styles from './index.less';
import { Row, Col, Icon, Avatar, Input } from 'antd';
import { Link } from 'dva/router';

const TopMostBar = () => {
  return (
    <Row className={styles.container}>
      <Col span={4}>
        <Link to="/wechat/login">
          <Avatar size="small" icon="user" className={styles.avatar}/>
        </Link>
      </Col>
      <Col span={16} className={styles.locationContainer}>
      	<Link to="/user/address">
            <Input addonAfter={<Icon type="right" />} defaultValue="暂未获取到地址" />
        </Link>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

TopMostBar.propTypes = {
};

export default TopMostBar;
