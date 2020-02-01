import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPatients } from '../../redux/patients';

class Patients extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    fetchPatients: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchPatients();
  }

  render() {
    const { patients } = this.props;
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Patients <small className="text-muted">example</small>
                <Link to="/patients/new" className="btn btn-primary btn-sm float-right">
                  <i className="fa fa-user-plus"></i> เพิ่ม
                </Link>
              </CardHeader>
              <CardBody>
                {/* #========== Spinner ==========# */}
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">HN</th>
                      <th scope="col">Name</th>
                      <th scope="col">Tel</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { patients && patients.map(patient => (
                      <tr key={patient.id}>
                        <td>{ patient.id }</td>
                        <td>{ patient.hn }</td>
                        <td>{ patient.pname + patient.fname + ' ' + patient.lname }</td>
                        <td>{ patient.tel }</td>
                        <td>&nbsp;</td>
                      </tr>
                    )) }
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

const mapStateToProps = state => ({
  patients: state.patient.patients
});

export default connect(
  mapStateToProps,
  { fetchPatients }
)(Patients);
