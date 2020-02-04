import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  Input,
  Button
} from "reactstrap";

// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import th from 'date-fns/locale/th';

// registerLocale('th', th)
// setDefaultLocale('th');

const initialState = {
  id: '',
  patient: '',
  dx: 'I60',
  dxDate: new Date(),
  dchHosp: '',
  dchDate: new Date(),
  pcu: '',
  regDate: new Date()
};

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render () {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col md="4" className="form-group">
                    <label htmlFor="patient">ผู้ป่วย</label>
                    <div className="input-group mb-0">
                      <Input
                        id="patient"
                        name="patient"
                        type="text"
                        value={this.state.patient}
                        onChange={this.handleChange}
                        placeholder="ผู้ป่วย"
                      />
                      <div className="input-group-append">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          id="button-addon2" 
                          data-toggle="modal" 
                          data-target="#patients"
                        >
                          <i className="material-icons">search</i>
                        </button>
                      </div>
                    </div>

                    <input type="hidden" id="pid" name="pid" />
                  </Col>
                  <Col md="5">
                    <label htmlFor="dx">วินิจฉัยโรคล่าสุด</label>
                    <div className="input-group mb-0">
                      <Input
                        id="dxDesc"
                        name="dxDesc"
                        type="text"
                        value={this.state.dxDesc}
                        onChange={this.handleChange}
                        placeholder="วินิจฉัยโรคล่าสุด"
                      />
                      <div className="input-group-append">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          id="button-addon2" 
                          data-toggle="modal" 
                          data-target="#icd10s"
                        >
                          <i className="material-icons">search</i>
                        </button>
                      </div>
                    </div>

                    <input type="hidden" id="dx" name="dx" />
                  </Col>
                  <Col md="3" className="form-group">
                    <label htmlFor="dxDate">วันที่เริ่มวินิจฉัย</label>
                    {/* <Input 
                      id="dxDate"
                      name="dxDate"
                      type="text"
                      value={this.state.dxDate}
                      onChange={this.handleChange}
                      placeholder="วันที่เริ่มวินิจฉัย"
                    /> */}
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
                    <label htmlFor="dchHosp">รพ.แม่ข่ายที่ D/C</label>
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
                    <label htmlFor="dchDate">วันที่จำหน่าย</label>
                    {/* <FormInput
                      id="dchDate"
                      name="dchDate"
                      type="text"
                      value={this.state.dchDate}
                      onChange={this.handleChange}
                      placeholder="วันที่ D/C"
                    /> */}
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
                    <label htmlFor="pcu">PCU ที่รับดูแล</label>
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
                    <label htmlFor="regDate">วันที่รับ Case</label>
                    {/* <FormInput 
                      id="regDate"
                      name="regDate"
                      type="text"
                      value={this.state.regDate}
                      onChange={this.handleChange}
                      placeholder="วันที่รับ Case"
                    /> */}
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
