import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';

import { fetchPatients } from '../../redux/patients';
import Pagination from '../Paginations/Pagination';

class ModalBarthelIndex extends Component {
  static propType = {
    patients: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchPatients();
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();

    console.log(link)
    this.props.fetchPatients(link);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { modal, toggle, className, patients, pager, onModalSelected } = this.props;

    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        id="modal-patients"
        className={className}
      >
        <ModalHeader toggle={toggle}>ประเมินความสามารถในการดำเนินชีวิตประจำวัน</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => this.handleSubmit}>
            <Table responsive hover>
              <thead>
                <tr>
                  <th style={{ width: '50%'}}>วินิจฉัยโรค</th>
                  <th>ประเมินคะแนน</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Feeding การรับประทานอาหาร เมื่อเตรียมสำรับไว้เรียบร้อยต่อหน้า</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> ตักเองไม่ได้ ต้องมีคนป้อน (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ตักเองได้ แต่ต้องมีคนช่วย (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ตักช่อยเหลือตนเองได้ (10)  
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>2. Grooming ล้างหน้า แปรงฟัน หวีผม</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> ต้องการความช่วยเหลือ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ทำเองได้ (5)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>3. Transfer ลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> ไม่สามารถนั่งได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ต้องการความช่วยเหลืออย่างมากจึงจะนั่งได้ (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ต้องการความช่วยเหลือหรือช่วยพยุงเล็กน้อย (10)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ทำเองได้ (15)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>4. Mobility การเคลื่อนที่ภายในห้องหรือบ้าน</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> เคลื่อนที่ไปไหนไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ใช้รถเข็นช่วยตัวเองเคลื่อนที่ได้เอง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> เดินหรือเคลื่อนที่โดยมีคนช่วยพยุง (10)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> เดินหรือเคลื่อนที่ได้เอง (15)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>5. Toilet การใช้ห้องน้ำ</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> ช่วยเหลือตนเองไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ทำเองได้บ้าง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ช่วยเหลือตนเองได้ทั้งหมด (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>6. Dressing การสวมใส่เสื้อผ้า</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> สวมใส่เองแทบไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> สวมใส่เองได้ร้อยละ 50 (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> สวมใส่เองได้ทั้งหมด (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>7. Stair การขึ้นลงบันได 1 ขั้น</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> ช่วยเหลือตนเองไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ทำเองได้บ้าง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ช่วยเหลือตนเองได้ทั้งหมด (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>8. Bathing การอาบน้ำ</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> ต้องการความช่วยเหลือ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> ทำเองได้ (5)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>9. Bowel การกลั้น ถ่ายอุจจาระใน 1 สัปดาห์ที่ผ่านมา</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> กลั้นไม่ได้หรือต้องสวนอุจจาระเสมอ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> กลั้นไม่ได้บางครั้ง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> กลั้นได้ปกติ (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>10. Bladder การกลั้น ถ่ายปัสสาวะใน 1 สัปดาห์ที่ผ่านมา</td>
                  <td>
                    <FormGroup check>
                      <Input type="radio" /> กลั้นไม่ได้หรือใช้สายสวนปัสสาวะเสมอ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> กลั้นไม่ได้บางครั้ง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input type="radio" /> กลั้นได้ปกติ (10)  
                    </FormGroup>
                  </td>            
                </tr>
              </tbody>
            </Table>

            <Button type="submit" size="sm" color="primary">
              <i className="fa fa-dot-circle-o"></i> บันทึกการเยี่ยม
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  patients: state.patient.patients,
  pager: state.patient.pager,
});

export default connect(
  mapStateToProps,
  { fetchPatients }
)(ModalBarthelIndex);
