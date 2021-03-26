import React from 'react';
import styles from './Test.module.scss';
import { Button, message } from 'antd';

const infoMessage = () => {
  const key = Math.trunc(5 * Math.random());

  let method: typeof message.info = message.info;
  // let method: typeof message.info = message.info;
  switch (key) {
    case 0: {
      method = message.success;
      break;
    }
    case 1: {
      method = message.error;
      break;
    }
    case 2: {
      method = message.info;
      break;
    }
    case 3: {
      method = message.warning;
      break;
    }
    default: {
      method = message.loading;
    }
  }

  method('Hello world!');
};

function Test() {
  return (
    <p className={styles.p}>
      <Button onClick={infoMessage}>Test Component</Button>
    </p>
  );
}

export default Test;
