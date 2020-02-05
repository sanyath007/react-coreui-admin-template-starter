import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import moment from 'moment';

import { fetchPatients } from '../../redux/patients';
import { fetchIcd10s } from '../../redux/icd10';
// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import th from 'date-fns/locale/th';

// registerLocale('th', th)
// setDefaultLocale('th');

const initialState = {
  id: '',
  pid: '',
  dx: 'I60',
  dx_date: moment(new Date()).format('DD-MM-YYYY'),
  dch_hosp: '',
  dch_date: moment(new Date()).format('DD-MM-YYYY'),
  pcu: '',
  reg_date: moment(new Date()).format('DD-MM-YYYY'),
  modalPatients: false,
  modalIcd10: false
};

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
    this.togglePatients = this.togglePatients.bind(this);
    this.toggleIcd10 = this.toggleIcd10.bind(this);
  }

  static propType = {
    patients: PropTypes.array.isRequired,
    icd10s: PropTypes.array.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    fetchIcd10s: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchPatients();
    this.props.fetchIcd10s();
  }

  togglePatients() {
    this.setState({
      modalPatients: !this.state.modalPatients
    })
  }
  
  toggleIcd10() {
    this.setState({
      modalIcd10: !this.state.modalIcd10
    })
  }

  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleDateChange (name, date) {
    this.setState((state) => {
      return {
        ...state,
        [name]: date
      };
    })
  }
  
  handleSubmit (event) {
    event.preventDefault();
    
    console.log(this.state);
    // this.props.onSubmit(this.state);
    // this.setState({ ...initialState });
  }

  onModalSelect = (e, id) => {
    console.log(id)
    if(this.state.modalPatients) {
      this.setState({
        pid: id,
        modalPatients: !this.state.modalPatients
      })
    } else {
      this.setState({
        dx: id,
        modalIcd10: !this.state.modalIcd10
      })
    }
  }

  render () {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <CardHeader>
                  <strong>Registrations</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>
                  <Row form>
                    <Col md="4" className="form-group">
                    <Label htmlFor="patient">ผู้ป่วย</Label>
                    <div className="input-group mb-0">
                      <Input
                        id="pid"
                        name="pid"
                        type="text"
                        value={this.state.pid}
                        onChange={this.handleChange}
                        placeholder="ผู้ป่วย"
                      />
                      <div className="input-group-append">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          id="button-addon1" 
                          onClick={this.togglePatients}
                        >
                          <i className="material-icons">search</i>
                        </button>
                      </div>
                    </div>

                    <input type="hidden" id="pid" name="pid" />
                  </Col>
                  <Col md="5">
                    <Label htmlFor="dx">วินิจฉัยโรคล่าสุด</Label>
                    <div className="input-group mb-0">
                      <Input
                        id="dx"
                        name="dx"
                        type="text"
                        value={this.state.dx}
                        onChange={this.handleChange}
                        placeholder="วินิจฉัยโรคล่าสุด"
                      />
                      <div className="input-group-append">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          id="button-addon2" 
                          onClick={this.toggleIcd10}
                        >
                          <i className="material-icons">search</i>
                        </button>
                      </div>
                    </div>

                    <input type="hidden" id="dx" name="dx" />
                  </Col>
                  <Col md="3" className="form-group">
                    <Label htmlFor="dxDate">วันที่เริ่มวินิจฉัย</Label>
                    <Input 
                      id="dx_date"
                      name="dx_date"
                      type="text"
                      value={this.state.dx_date}
                      onChange={this.handleChange}
                      placeholder="วันที่เริ่มวินิจฉัย"
                    />
                    {/* <DatePicker
                      id="dxDate"
                      name="dxDate"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.dxDate}
                      onChange={this.handleDateChange.bind(this, 'dxDate')}
                      className="form-control"
                      placeholderText="วันที่เริ่มวินิจฉัย"
                    /> */}
                  </Col>
                </Row>

                <Row form>
                  <Col md="9" className="form-group">
                    <Label htmlFor="dchHosp">รพ.แม่ข่ายที่ D/C</Label>
                    <Input
                      type="select"
                      id="dchHosp"
                      name="dchHosp"
                      value={this.state.dchHosp}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      {this.props.hosps && this.props.hosps.map((h) => (
                        <option key={h.hospcode}>{h.name}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col md="3" className="form-group">
                    <Label htmlFor="dchDate">วันที่จำหน่าย</Label>
                    <Input
                      id="dch_date"
                      name="dch_date"
                      type="text"
                      value={this.state.dch_date}
                      onChange={this.handleChange}
                      placeholder="วันที่ D/C"
                    />
                    {/* <DatePicker
                      id="dchDate"
                      name="dchDate"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.dchDate}
                      onChange={this.handleDateChange.bind(this, 'dchDate')}
                      className="form-control"
                      placeholderText="วันที่จำหน่าย"
                    /> */}
                  </Col>
                </Row>

                <Row form>
                  <Col md="9" className="form-group">
                    <Label htmlFor="pcu">PCU ที่รับดูแล</Label>
                    <Input
                      type="select"
                      id="pcu"
                      name="pcu"
                      value={this.state.pcu}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      {this.props.pcus && this.props.pcus.map((h) => (
                        <option key={h.hospcode}>{h.name}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col md="3" className="form-group">
                    <Label htmlFor="regDate">วันที่รับ Case</Label>
                    <Input 
                      id="reg_date"
                      name="reg_date"
                      type="text"
                      value={this.state.reg_date}
                      onChange={this.handleChange}
                      placeholder="วันที่รับ Case"
                    />
                    {/* <DatePicker
                      id="regDate"
                      name="regDate"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.regDate}
                      onChange={this.handleDateChange.bind(this, 'regDate')}
                      className="form-control"
                      placeholderText="วันที่รับ Case"
                    /> */}
                  </Col>
                </Row>
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> ลงทะเบียนผู้ป่วย
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            
            {/* #========= Patients Modal =========# */}
            <Modal isOpen={this.state.modalPatients} toggle={this.togglePatients} size="lg" className={this.props.className}>
              <ModalHeader toggle={this.togglePatients}>เลือกผู้ป่วย</ModalHeader>
              <ModalBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>PID</th>
                      <th>CID</th>
                      <th>ชื่อ-สกุล</th>
                      <th>อายุ</th>
                      <th>เลือก</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.props.patients && this.props.patients.map(patient => (
                      <tr key={patient.id+patient.hn}>
                        <td>{patient.id}</td>
                        <td>{patient.pid}</td>
                        <td>{patient.cid}</td>
                        <td>{patient.pname + patient.fname + ' ' + patient.lname}</td>
                        <td>{patient.age_y}</td>
                        <td>
                          <button className="btn btn-success" onClick={(e) => this.onModalSelect(e, patient.pid)}>
                            เลือก
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ModalBody>
            </Modal>

            {/* #========= ICD10 Modal =========# */}
            <Modal isOpen={this.state.modalIcd10} toggle={this.toggleIcd10} size="lg" className={this.props.className}>
              <ModalHeader toggle={this.toggleIcd10}>เลือก ICD10</ModalHeader>
              <ModalBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ICD10</th>
                      <th>Description</th>
                      <th>Remark</th>
                      <th>เลือก</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.props.icd10s && this.props.icd10s.map((icd10, index) => {
                      return (
                        <tr key={icd10.code}>
                          <td>{index + 1}</td>
                          <td>{icd10.code}</td>
                          <td>{icd10.name}</td>
                          <td>{icd10.tname}</td>
                          <td>
                            <button className="btn btn-success" onClick={(e) => this.onModalSelect(e, icd10.code)}>
                              เลือก
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </ModalBody>
            </Modal>

          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patient.patients,
  icd10s: state.icd10.icd10s
});

export default connect(
  mapStateToProps,
  { fetchPatients, fetchIcd10s }
)(NewForm);
