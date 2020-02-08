import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Row,
  Table
} from 'reactstrap';

class BarthelIndex extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> 
                ประเมินความสามารถในการดำเนินชีวิตประจำวัน <small className="text-muted">(Barthel Index)</small>
                <Link to="/visitions/new" className="btn btn-primary btn-sm float-right">
                  <i className="fa fa-user-plus"></i> เพิ่ม
                </Link>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <div className="input-group mb-0">
                        <Input
                          id="pid"
                          name="pid"
                          type="text"
                          placeholder="PID"
                        />
                        <div className="input-group-append">
                          <button 
                            type="button" 
                            id="btnPatient" 
                            className="btn btn-outline-secondary"
                          >
                            <i className="material-icons">search</i>
                          </button>
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={8}>
                    <FormGroup>
                      <Input
                        id="patient_name"
                        name="patient_name"
                        type="text"
                        placeholder="ชื่อ-สกุลผู้ป่วย"
                        readOnly
                      />
                    </FormGroup>            
                  </Col>
                </Row>

                <Table bordered responsive hover>
                  <thead>
                    <tr>
                      <th style={{ width: '20%'}} scope="col">วินิจฉัยโรค</th>
                      <th style={{ width: '25%'}} scope="col">ประเมินคะแนน</th>
                      <th scope="col">ครั้งที่</th>
                      <th scope="col">ครั้งที่</th>
                      <th scope="col">ครั้งที่</th>
                      <th scope="col">ครั้งที่</th>
                      <th scope="col">ครั้งที่</th>
                      <th scope="col">ครั้งที่</th>
                      <th scope="col">ครั้งที่</th>
                      <th scope="col">ครั้งที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. Feeding การรับประทานอาหาร เมื่อเตรียมสำรับไว้เรียบร้อยต่อหน้า</td>
                      <td>
                        <FormGroup check>
                          ตักเองไม่ได้ ต้องมีคนป้อน (0)  
                        </FormGroup>
                        <FormGroup check>
                          ตักเองได้ แต่ต้องมีคนช่วย (5)  
                        </FormGroup>
                        <FormGroup check>
                          ตักช่อยเหลือตนเองได้ (10)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>2. Grooming ล้างหน้า แปรงฟัน หวีผม</td>
                      <td>
                        <FormGroup check>
                          ต้องการความช่วยเหลือ (0)  
                        </FormGroup>
                        <FormGroup check>
                          ทำเองได้ (5)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>3. Transfer ลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้</td>
                      <td>
                        <FormGroup check>
                          ไม่สามารถนั่งได้ (0)  
                        </FormGroup>
                        <FormGroup check>
                          ต้องการความช่วยเหลืออย่างมากจึงจะนั่งได้ (5)  
                        </FormGroup>
                        <FormGroup check>
                          ต้องการความช่วยเหลือหรือช่วยพยุงเล็กน้อย (10)  
                        </FormGroup>
                        <FormGroup check>
                          ทำเองได้ (15)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>4. Mobility การเคลื่อนที่ภายในห้องหรือบ้าน</td>
                      <td>
                        <FormGroup check>
                          เคลื่อนที่ไปไหนไม่ได้ (0)  
                        </FormGroup>
                        <FormGroup check>
                          ใช้รถเข็นช่วยตัวเองเคลื่อนที่ได้เอง (5)  
                        </FormGroup>
                        <FormGroup check>
                          เดินหรือเคลื่อนที่โดยมีคนช่วยพยุง (10)  
                        </FormGroup>
                        <FormGroup check>
                          เดินหรือเคลื่อนที่ได้เอง (15)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>5. Toilet การใช้ห้องน้ำ</td>
                      <td>
                        <FormGroup check>
                          ช่วยเหลือตนเองไม่ได้ (0)  
                        </FormGroup>
                        <FormGroup check>
                          ทำเองได้บ้าง (5)  
                        </FormGroup>
                        <FormGroup check>
                          ช่วยเหลือตนเองได้ทั้งหมด (10)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>6. Dressing การสวมใส่เสื้อผ้า</td>
                      <td>
                        <FormGroup check>
                          สวมใส่เองแทบไม่ได้ (0)  
                        </FormGroup>
                        <FormGroup check>
                          สวมใส่เองได้ร้อยละ 50 (5)  
                        </FormGroup>
                        <FormGroup check>
                          สวมใส่เองได้ทั้งหมด (10)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>7. Stair การขึ้นลงบันได 1 ขั้น</td>
                      <td>
                        <FormGroup check>
                          ช่วยเหลือตนเองไม่ได้ (0)  
                        </FormGroup>
                        <FormGroup check>
                          ทำเองได้บ้าง (5)  
                        </FormGroup>
                        <FormGroup check>
                          ช่วยเหลือตนเองได้ทั้งหมด (10)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>8. Bathing การอาบน้ำ</td>
                      <td>
                        <FormGroup check>
                          ต้องการความช่วยเหลือ (0)  
                        </FormGroup>
                        <FormGroup check>
                          ทำเองได้ (5)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>9. Bowel การกลั้น ถ่ายอุจจาระใน 1 สัปดาห์ที่ผ่านมา</td>
                      <td>
                        <FormGroup check>
                          กลั้นไม่ได้หรือต้องสวนอุจจาระเสมอ (0)  
                        </FormGroup>
                        <FormGroup check>
                          กลั้นไม่ได้บางครั้ง (5)  
                        </FormGroup>
                        <FormGroup check>
                          กลั้นได้ปกติ (10)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>10. Bladder การกลั้น ถ่ายปัสสาวะใน 1 สัปดาห์ที่ผ่านมา</td>
                      <td>
                        <FormGroup check>
                          กลั้นไม่ได้หรือใช้สายสวนปัสสาวะเสมอ (0)  
                        </FormGroup>
                        <FormGroup check>
                          กลั้นไม่ได้บางครั้ง (5)  
                        </FormGroup>
                        <FormGroup check>
                          กลั้นได้ปกติ (10)  
                        </FormGroup>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BarthelIndex;