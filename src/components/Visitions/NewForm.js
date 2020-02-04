import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Button
} from "reactstrap";
// import TagsInput from 'react-tagsinput';
// import Dropzone from 'react-dropzone';

// import 'react-tagsinput/react-tagsinput.css';

const initialState = {
  id: '',
  pid: '',
  visitCount: 0,
  visitDate: '',
  visitors: [],
  barthelScore: 0,
  impairment: '',
  complication: '',
  isRehab: false,
  visitStatus: 0,
  attachments: []
};

const boxStyle = { 
  border: '1px solid #000', 
  backgroundColor: '#E6E6E6',
  height: '100px',
  padding: '5px'
};

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

  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }
  
  handleTagsInputChange (tags) {
    this.setState({ visitors: tags });
  }
  
  handleSubmit (event) {
    event.preventDefault();
    
    console.log(this.state);
    this.props.onSubmit(this.state);
    this.setState({ ...initialState });
  }
  
  handleDrop (acceptedFiles) {
    this.setState({ 
      attachments: this.state.attachments.concat(acceptedFiles) });
  }

  render () {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col md="4" className="form-group">
                    <label htmlFor="pid">PID ผู้ป่วย</label>
                    <Input
                      id="pid"
                      name="pid"
                      type="text"
                      value={this.state.pid}
                      onChange={this.handleChange}
                      placeholder="ผู้ป่วย"
                    />
                  </Col>
                  <Col md="4">
                    <label htmlFor="visitCount">ครั้งที่</label>
                    <Input
                      id="visitCount"
                      name="visitCount"
                      type="text"
                      value={this.state.visitCount}
                      onChange={this.handleChange}
                      placeholder="ครั้งที่"
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="visitDate">วันที่เยี่ยมบ้าน</label>
                    <Input 
                      id="visitDate"
                      name="visitDate"
                      type="text"
                      value={this.state.visitDate}
                      onChange={this.handleChange}
                      placeholder="วันที่เยี่ยมบ้าน"
                    />
                  </Col>
                </Row>

                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="visitors">บุคลากร</label>
                    {/* <TagsInput
                      id="visitors"
                      name="visitors"
                      value={this.state.visitors}
                      onChange={this.handleTagsInputChange}
                    /> */}
                  </Col>
                </Row>

                <Row form>
                  <Col md="4" className="form-group">
                    <label htmlFor="birthdate">Barthel Score</label>
                    <Input
                      id="birthdate"
                      name="birthdate"
                      type="text"
                      value={this.state.birthdate}
                      onChange={this.handleChange}
                      placeholder="Barthel Score"
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="age">Impairment</label>
                    <Input
                      type="select"
                      id="sex"
                      name="sex"
                      value={this.state.sex}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      <option>Swallowing problem</option>
                      <option>Communication problem</option>
                      <option>Mobility problem</option>
                      <option>Cognitive and perception problem</option>
                      <option>Bowel and bladder problem</option>
                    </Input>
                  </Col>
                  <Col md="4">
                    <label htmlFor="sex">Complication</label>
                    <Input
                      type="select"
                      id="sex"
                      name="sex"
                      value={this.state.sex}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      <option>Bedsore grade (1-4)</option>
                      <option>Urinary tract infection (UTI)</option>
                      <option>Aspirate pneumonia</option>
                    </Input>
                  </Col>
                </Row>

                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="road">การ Rehab</label>
                    <Input defaultChecked>ได้รับการ Rehab</Input>
                    <Input>ไม่ได้รับการ Rehab</Input>
                  </Col>
                  <Col md="6">
                    <label htmlFor="moo">สถานะการเยี่ยม</label>
                    <Input defaultChecked>ไม่พบผู้ป่วย</Input>
                    <Input>ผู้ป่วยย้ายที่อยู่</Input>
                    <Input>เสียชีวิตแล้ว</Input>
                  </Col>
                </Row>

                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="zipcode">รูปถ่าย/ไฟล์ </label>
                    {/* <Dropzone onDrop={this.handleDrop} multiple>
                      {({getRootProps, getInputProps, isDragActive}) => (
                        <div {...getRootProps()} style={{ border: '1px solid #000', minHeight: '50px', padding: '10px' }}>
                          <input {...getInputProps()} />
                          {isDragActive ? `Drop it like it's Hot!` : 'Click me or drag a file to upload!'}

                          <Row form>
                            { this.state.attachments.length > 0 && this.state.attachments.map(file => (
                              <Col md="3" key={file.name}>
                                <img src={URL.createObjectURL(file)} style={ thumbnailStyle } alt=""/> {file.name}
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                    </Dropzone> */}
                  </Col>
                </Row>
                
                <Button type="submit">บันทึก</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default NewForm;
