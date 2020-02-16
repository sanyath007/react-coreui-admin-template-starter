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
  Row
} from 'reactstrap';

import ModalMap from '../Modals/ModalMap';

import { addPatient } from '../../redux/patients';
import { fetchChangwats } from '../../redux/changwat';
import { fetchAmphurs } from '../../redux/amphur';
import { fetchTambons } from '../../redux/tambon';

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.initialState = {
      pid: '',
      hn: '',
      cid: '',
      pname: '',
      fname: '',
      lname: '',
      birthdate: '',
      ageY: '',
      sex: '',
      tel: '',
      address: '',
      moo: '',
      road: '',
      tambon: '',
      amphur: '',
      changwat: '',
      zipcode: '',
      latlong: '',
      filterAmphurs: [],
      filterTambons: [],
      modal: false
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelectedChangwat = this.onSelectedChangwat.bind(this);
    this.onSelectedAmphur = this.onSelectedAmphur.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    changwats: PropTypes.array.isRequired,
    amphurs: PropTypes.array.isRequired,
    tambons: PropTypes.array.isRequired,
    addPatient: PropTypes.func.isRequired,
    fetchChangwats: PropTypes.func.isRequired,
    fetchAmphurs: PropTypes.func.isRequired,
    fetchTambons: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchChangwats();
    this.props.fetchAmphurs();
    this.props.fetchTambons();
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    
    if (name === 'changwat') {
      this.onSelectedChangwat(value)
    }
    
    if (name === 'amphur') {
      this.onSelectedAmphur(value)
    }
  }
  
  onSelectedChangwat(value) {
    this.setState(prevState => ({
      ...prevState,
      filterAmphurs: this.props.amphurs.filter(amp => amp.chw_id === value)
    }));
  }
  
  onSelectedAmphur(value) {
    this.setState({
      filterTambons: this.props.tambons.filter(tam => tam.amp_id === value)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { filterAmphurs, filterTambons, modal, ...newPatient } = this.state;

    this.props.addPatient(newPatient);

    this.setState(this.initialState);

    this.props.history.push('/patients');
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  
  render() {
    const { changwats } = this.props;
    const { filterAmphurs, filterTambons } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <CardHeader>
                  <strong>Patient</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>
                  <Row form>
                    <Col md="4" className="form-group">
                      <Label htmlFor="pid">PID</Label>
                      <Input
                        id="pid"
                        name="pid"
                        type="text"
                        value={this.state.pid}
                        onChange={this.handleChange}
                        placeholder="PID"
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="hn">HN</Label>
                      <Input
                        id="hn"
                        name="hn"
                        type="text"
                        value={this.state.hn}
                        onChange={this.handleChange}
                        placeholder="HN"
                      />
                    </Col>
                    <Col md="4" className="form-group">
                      <Label htmlFor="cid">เลขบัตรประชาชน</Label>
                      <Input 
                        id="cid"
                        name="cid"
                        type="text"
                        value={this.state.cid}
                        onChange={this.handleChange}
                        placeholder="เลขบัตรประชาชน"
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="2" className="form-group">
                      <Label htmlFor="pname">คำนำหน้า</Label>
                      <Input
                        type="select"
                        id="pname"
                        name="pname"
                        value={this.state.pname}
                        onChange={this.handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="ด.ช.">ด.ช.</option>
                        <option value="ด.ญ.">ด.ญ.</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </Input>
                    </Col>
                    <Col md="5" className="form-group">
                      <Label htmlFor="fname">ชื่อ</Label>
                      <Input
                        id="fname"
                        name="fname"
                        type="text"
                        value={this.state.fname}
                        onChange={this.handleChange}
                        placeholder="ชื่อ"
                      />
                    </Col>
                    <Col md="5">
                      <Label htmlFor="lname">สกุล</Label>
                      <Input
                        id="lname"
                        name="lname"
                        type="text"
                        value={this.state.lname}
                        onChange={this.handleChange}
                        placeholder="สกุล"
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                      <Label htmlFor="birthdate">วันเกิด</Label>
                      <Input
                        id="birthdate"
                        name="birthdate"
                        type="text"
                        value={this.state.birthdate}
                        onChange={this.handleChange}
                        placeholder="วันเกิด"
                      />
                    </Col>
                    <Col md="3" className="form-group">
                      <Label htmlFor="ageY">อายุ</Label>
                      <Input
                        id="ageY"
                        name="ageY"
                        type="text"
                        value={this.state.ageY}
                        onChange={this.handleChange}
                        placeholder="อายุ"
                      />
                    </Col>
                    <Col md="3">
                      <Label htmlFor="sex">เพศ</Label>
                      <Input type="select"
                        id="sex"
                        name="sex"
                        value={this.state.sex}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        <option value="1">ชาย</option>
                        <option value="2">หญิง</option>
                      </Input>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label htmlFor="address">ที่อยู่</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={this.state.address}
                      onChange={this.handleChange}
                      placeholder="ที่อยู่"
                    />
                  </FormGroup>

                  <Row form>
                    <Col md="10" className="form-group">
                      <Label htmlFor="road">ถนน</Label>
                      <Input
                        id="road"
                        name="road"
                        type="text"
                        value={this.state.road}
                        onChange={this.handleChange}
                        placeholder="ถนน"
                      />
                    </Col>
                    <Col md="2">
                      <Label htmlFor="moo">หมู่</Label>
                      <Input
                        id="moo"
                        name="moo"
                        type="text"
                        value={this.state.moo}
                        onChange={this.handleChange}
                        placeholder="หมู่"
                        />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="4" className="form-group">
                      <Label htmlFor="changwat">จังหวัด</Label>
                      <Input type="select" 
                        id="changwat"
                        name="changwat"
                        value={this.state.changwat}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        {changwats && changwats.map(chw => (
                          <option key={chw.chw_id} value={chw.chw_id}>{chw.changwat}</option>
                        ))}
                      </Input>
                    </Col>
                    <Col md="4" className="form-group">
                      <Label htmlFor="amphur">อำเภอ</Label>
                      <Input type="select"
                        id="amphur"
                        name="amphur"
                        value={this.state.amphur}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        {this.state.changwat && filterAmphurs && filterAmphurs.map(amp => (
                          <option key={amp.id} value={amp.id}>{amp.amphur}</option>
                        ))}
                      </Input>
                    </Col>
                    <Col md="4" className="form-group">
                      <Label htmlFor="tambon">ตำบล</Label>
                      <Input type="select"
                        id="tambon"
                        name="tambon"
                        value={this.state.tambon}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        {this.state.amphur && filterTambons && filterTambons.map(tam => (
                          <option key={tam.id} value={tam.id}>{tam.tambon}</option>
                        ))}
                      </Input>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="2" className="form-group">
                      <Label htmlFor="zipcode">ไปรษณีย์</Label>
                      <Input
                        id="zipcode"
                        name="zipcode"
                        type="text"
                        value={this.state.zipcode}
                        onChange={this.handleChange}
                        placeholder="รหัสไปรษณีย์"
                      />
                    </Col>
                    <Col md="5" className="form-group">
                      <Label htmlFor="latlong">ละติจูด, ลองติจูด</Label>
                      <Input
                        id="latlong"
                        name="latlong"
                        type="text"
                        value={this.state.latlong}
                        onChange={this.handleChange}
                        onClick={this.toggle}
                        placeholder="ละติจูด, ลองติจูด"
                      />
                    </Col>
                    <Col md="5" className="form-group">
                      <Label htmlFor="tel">โทรศัพท์</Label>
                      <Input
                        id="tel"
                        name="tel"
                        type="text"
                        value={this.state.tel}
                        onChange={this.handleChange}
                        placeholder="โทรศัพท์ติดต่อ"
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> เพิ่มผู้ป่วย
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            
            {/* #========= Modal =========# */}
            <ModalMap
              isOpen={this.state.modal}
              toggle={this.toggle}
              size="lg"
              className={this.props.className}
            />              

          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  changwats: state.changwat.changwats,
  amphurs: state.amphur.amphurs,
  tambons: state.tambon.tambons
});

export default connect(
  mapStateToProps,
  { 
    addPatient,
    fetchChangwats,
    fetchAmphurs,
    fetchTambons
  }
)(NewForm);
