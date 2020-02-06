import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import TagsInput from 'react-tagsinput';
import Dropzone from 'react-dropzone';

import 'react-tagsinput/react-tagsinput.css';

import ModalPatients from '../Modals/ModalPatients';
import { addVisition } from '../../redux/visitions';

const initialState = {
  id: '',
  pid: '',
  patient_name: '',
  visit_count: 0,
  visit_date: moment(Date.now()).format('YYYY-MM-DD'),
  visitors: [],
  barthel_score: 0,
  impairment: '',
  complication: '',
  is_rehab: '',
  visit_status: '',
  attachments: [],
  modal: false,
};

const fileBoxStyle = {
  border: '1px solid #e4e7ea',
  borderRadius: '2px',
  minHeight: '50px',
  padding: '10px'
}

const thumbnailStyle = {
  width: '120px',
  height: '120px'
}

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleTagsInputChange = this.handleTagsInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  static propTypes = {
    addVisition: PropTypes.func.isRequired
  };

  handleChange (e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const { modal, patient_name, ...visition} = this.state;
    
    this.props.addVisition(visition);

    this.setState( this.initialState);
  }
    
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleTagsInputChange (tags) {
    this.setState({ visitors: tags });
  }
  
  handleDrop (acceptedFiles) {
    this.setState({ 
      attachments: this.state.attachments.concat(acceptedFiles) });
  }

  handleModalSelected = (e, obj) => {
      this.setState({
        pid: obj.pid,
        patient_name: obj.pname + obj.fname + ' ' + obj.lname,
        modal: !this.state.modal
      });
  }

  render () {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <CardHeader>
                  <strong>Visitions</strong>
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
                            onClick={this.toggleModal}
                          >
                            <i className="material-icons">search</i>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col md="8" className="form-group">
                      <Label htmlFor="dchDate">ชื่อ-สกุลผู้ป่วย</Label>
                      <Input
                        id="patient_name"
                        name="patient_name"
                        type="text"
                        value={this.state.patient_name}
                        onChange={this.handleChange}
                        placeholder="ชื่อ-สกุลผู้ป่วย"
                        readOnly
                      />
                    </Col>
                    <Col md="6">
                      <Label htmlFor="visitCount">ครั้งที่</Label>
                      <Input
                        id="visit_count"
                        name="visit_count"
                        type="text"
                        value={this.state.visit_count}
                        onChange={this.handleChange}
                        placeholder="ครั้งที่"
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <Label htmlFor="visitDate">วันที่เยี่ยมบ้าน</Label>
                      <Input 
                        id="visit_date"
                        name="visit_date"
                        type="text"
                        value={this.state.visit_date}
                        onChange={this.handleChange}
                        placeholder="วันที่เยี่ยมบ้าน"
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="12" className="form-group">
                      <Label htmlFor="visitors">บุคลากร</Label>
                      <TagsInput
                        id="visitors"
                        name="visitors"
                        value={this.state.visitors}
                        onChange={this.handleTagsInputChange}
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="4" className="form-group">
                      <Label htmlFor="barthelScore">Barthel Score</Label>
                      <Input
                        id="barthel_score"
                        name="barthel_score"
                        type="text"
                        value={this.state.barthel_score}
                        onChange={this.handleChange}
                        placeholder="Barthel Score"
                      />
                    </Col>
                    <Col md="4" className="form-group">
                      <Label htmlFor="age">Impairment</Label>
                      <Input
                        type="select"
                        id="impairment"
                        name="impairment"
                        value={this.state.impairment}
                        onChange={this.handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="1">Swallowing problem</option>
                        <option value="2">Communication problem</option>
                        <option value="3">Mobility problem</option>
                        <option value="4">Cognitive and perception problem</option>
                        <option value="5">Bowel and bladder problem</option>
                      </Input>
                    </Col>
                    <Col md="4">
                      <Label htmlFor="sex">Complication</Label>
                      <Input
                        type="select"
                        id="complication"
                        name="complication"
                        value={this.state.complication}
                        onChange={this.handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="1">Bedsore grade (1-4)</option>
                        <option value="2">Urinary tract infection (UTI)</option>
                        <option value="3">Aspirate pneumonia</option>
                      </Input>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                      <Label htmlFor="road">การ Rehab</Label>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="is_rehab" value="1" onChange={this.handleChange} />{' '}ได้รับการ Rehab
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="is_rehab" value="0" onChange={this.handleChange} />{' '}ไม่ได้รับการ Rehab
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="moo">สถานะการเยี่ยม</Label>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="visit_status" value="0" onChange={this.handleChange} />{' '}ไม่พบผู้ป่วย
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="visit_status" value="1" onChange={this.handleChange} />{' '}ผู้ป่วยย้ายที่อยู่
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="visit_status" value="2" onChange={this.handleChange} />{' '}เสียชีวิตแล้ว
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="12" className="form-group">
                      <Label htmlFor="attachments">รูปถ่าย/ไฟล์ </Label>
                      <Dropzone onDrop={this.handleDrop} multiple>
                        {({getRootProps, getInputProps, isDragActive}) => (
                          <div {...getRootProps()} style={fileBoxStyle}>
                            <input {...getInputProps()} />
                            {isDragActive ? `Drop it like it's Hot!` : 'Click me or drag a file to upload!'}

                            <Row form>
                              { this.state.attachments.length > 0 && this.state.attachments.map(file => (
                                <Col md="3" key={file.name}>
                                  <img src={URL.createObjectURL(file)} style={ thumbnailStyle } alt="" /> {file.name}
                                </Col>
                              ))}
                            </Row>
                          </div>
                        )}
                      </Dropzone>
                    </Col>
                  </Row>
          
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> บันทึกการเยี่ยม
                  </Button>
                </CardFooter>
              </Form>
            </Card>

            <ModalPatients 
              modal={this.state.modal} 
              toggle={() => this.toggleModal} 
              onModalSelected={this.handleModalSelected} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  { addVisition }
)(NewForm);
