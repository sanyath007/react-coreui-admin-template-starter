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
  ModalHeader
} from 'reactstrap';
import moment from 'moment';

import { fetchPatients } from '../../redux/patients';
import { fetchIcd10s } from '../../redux/icd10';
import { fetchHosps, fetchPcus } from '../../redux/hospcode';
import { addRegistration } from '../../redux/registrations';

import Pagination from '../Paginations/Pagination';
// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import th from 'date-fns/locale/th';

// registerLocale('th', th)
// setDefaultLocale('th');

const initialState = {
  id: '',
  pid: '',
  patient_name: '',
  dx: '',
  dx_desc: '',
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
    pagerPatients: PropTypes.object.isRequired,
    icd10s: PropTypes.array.isRequired,
    pagerIcd10s: PropTypes.object.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    fetchIcd10s: PropTypes.func.isRequired,
    fetchHosps: PropTypes.func.isRequired,
    fetchPcus: PropTypes.func.isRequired,
    addRegistration: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchPatients();
    this.props.fetchIcd10s();
    this.props.fetchHosps();
    this.props.fetchPcus();
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

  handleChange (e) {
    const { name, value } = e.target;

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
    
    const { id, patient_name, dx_desc, modalIcd10, modalPatients, ...registration } = this.state;

    this.props.addRegistration(registration);

    // this.setState({ ...initialState });
  }

  onModalSelect = (e, obj) => {
    console.log(obj)
    if(this.state.modalPatients) {
      this.setState({
        pid: obj.pid,
        patient_name: obj.pname + obj.fname + ' ' + obj.lname,
        modalPatients: !this.state.modalPatients
      })
    } else {
      this.setState({
        dx: obj.code,
        dx_desc: obj.name,
        modalIcd10: !this.state.modalIcd10
      })
    }
  }

  handlePaginateLink = (e, url) => {
    e.preventDefault();

    console.log(url)
    if(this.state.modalPatients) {
      this.props.fetchPatients(url);
    } else {
      this.props.fetchIcd10s(url);
    }
  }

  render () {
    const { hosps, pcus, pagerPatients, pagerIcd10s } = this.props;
    
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
                      <Label htmlFor="patient">PID</Label>
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
                    </Col>
                    <Col md="5" className="form-group">
                      <Label htmlFor="dchDate">ชื่อ-สกุลผู้ป่วย</Label>
                      <Input
                        id="patient_name"
                        name="patient_name"
                        type="text"
                        value={this.state.patient_name}
                        onChange={this.handleChange}
                        placeholder="ชื่อ-สกุลผู้ป่วย"
                      />
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
                    <Col md="4">
                      <Label htmlFor="dx">ICD10</Label>
                      <div className="input-group mb-0">
                        <Input
                          id="dx"
                          name="dx"
                          type="text"
                          value={this.state.dx}
                          onChange={this.handleChange}
                          placeholder="ICD10"
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
                    </Col>
                    <Col md="8" className="form-group">
                      <Label htmlFor="dchDate">วินิจฉัยโรค</Label>
                      <Input
                        id="dx_desc"
                        name="dx_desc"
                        type="text"
                        value={this.state.dx_desc}
                        onChange={this.handleChange}
                        placeholder="วินิจฉัยโรค"
                      />
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
                        { hosps && hosps.map((h) => (
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
                        { pcus && pcus.map((h) => (
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
            <Modal
              isOpen={this.state.modalPatients}
              toggle={this.togglePatients}
              size="lg"
              id="modal-patients"
              className={this.props.className}
            >
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
                          <button className="btn btn-success" onClick={(e) => this.onModalSelect(e, patient)}>
                            เลือก
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                { pagerPatients && (
                  <Pagination pager={pagerPatients} onPaginateLink={this.handlePaginateLink} />
                )}
              </ModalBody>
            </Modal>

            {/* #========= ICD10 Modal =========# */}
            <Modal
              isOpen={this.state.modalIcd10}
              toggle={this.toggleIcd10}
              size="lg"
              id="modal-icd10s"
              className={this.props.className}
            >
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
                            <button className="btn btn-success" onClick={(e) => this.onModalSelect(e, icd10)}>
                              เลือก
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>

                { pagerIcd10s && (
                  <Pagination pager={pagerIcd10s} onPaginateLink={this.handlePaginateLink} />
                )}
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
  pagerPatients: state.patient.pager,
  icd10s: state.icd10.icd10s,
  pagerIcd10s: state.icd10.pager,
  hosps: state.hospcode.hosps,
  pcus: state.hospcode.pcus
});

export default connect(
  mapStateToProps,
  { fetchPatients, fetchIcd10s, fetchHosps, fetchPcus, addRegistration }
)(NewForm);
