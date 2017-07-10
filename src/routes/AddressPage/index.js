import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

function AddressPage() {
  return (
    <div className={styles.container}>
    Address
    </div>
  );
}

AddressPage.propTypes = {
};

export default connect()(AddressPage);
