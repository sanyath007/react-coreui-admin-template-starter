import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import MapContainer from '../Maps/MapContainer'

const ModalMap = (props) => {
  const { isOpen, toggle, className } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className={className}>
      <ModalHeader toggle={toggle}>พิกัดที่อยู๋ (ละติจูด, ลองติจูด)</ModalHeader>
      <ModalBody>
        <div style={{ height: '480px' }} className="mr-1">
          <MapContainer />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>ตกลง</Button>{' '}
        <Button color="danger" onClick={toggle}>ยกเลิก</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalMap;
