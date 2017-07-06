import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import TopMostBar from '../components/TopMostBar';

function IndexPage() {
  return (
    <div className={styles.container}>
      <TopMostBar />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
