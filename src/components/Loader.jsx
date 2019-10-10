import React from 'react';
import {RingLoader} from 'react-spinners'
import styles from '../styles/Loader.module.css'

const Loader = ({loading}) => {
  return (
    <div className={styles.loader}>
      <RingLoader
        sizeUnit={"em"}
        size={2}
        color={'#123abc'}
        loading={loading}
      />
    </div>
  );
}
 
export default Loader;