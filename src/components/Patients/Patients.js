import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPatients } from '../../redux/patients';

class Patients extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    pager: PropTypes.object,
    isSuccess: PropTypes.object,
    fetchPatients: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchPatients();
  }

  handlePaginateLink(e, link) {
    e.preventDefault();
    
    console.log(link);
    this.props.fetchPatients(link);
  }

  render() {
    const { patients, pager, isSuccess } = this.props;
    
    const setPageItemClass = (link) => link ? "page-item" : "page-item disabled";

    return (
      <div className="animated fadeIn">
        { isSuccess && isSuccess.status && (
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
            I am an alert and I can be dismissed!        
          </div>
        )}

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
                      <th scope="col" style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { patients && patients.map(patient => (
                      <tr key={patient.id}>
                        <td>{ patient.id }</td>
                        <td>{ patient.hn }</td>
                        <td>{ patient.pname + patient.fname + ' ' + patient.lname }</td>
                        <td>{ patient.tel }</td>
                        <td style={{ textAlign: "center" }}>
                          <Link to="/patients/new" className="btn btn-warning btn-sm mr-1">
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link to="/patients/new" className="btn btn-danger btn-sm">
                            <i className="fa fa-trash-o"></i>
                          </Link> 
                        </td>
                      </tr>
                    )) }
                  </tbody>
                </Table>
                
                { pager && (
                  <nav aria-label="..." className="float-right">
                    <ul className="pagination">
                      <li className={setPageItemClass(pager.prev_page_url)}>
                        <a className="page-link" href="#" onClick={e => this.handlePaginateLink(e, pager.prev_page_url)}>Previous</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item active" aria-current="page">
                        <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">3</a>
                      </li>
                      <li className={setPageItemClass(pager.next_page_url)}>
                        <a className="page-link" href="#" onClick={e => this.handlePaginateLink(e, pager.next_page_url)}>Next</a>
                      </li>
                    </ul>
                  </nav>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patient.patients,
  pager: state.patient.pager,
  isSuccess: state.patient.success
});

export default connect(
  mapStateToProps,
  { fetchPatients }
)(Patients);
