import React from 'react';
import { connect } from 'dva';
import styles from './AddressPage.less';

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
