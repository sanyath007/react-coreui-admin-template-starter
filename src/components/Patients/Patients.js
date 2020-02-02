import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPatients, fetchPatient, deletePatient, hideAlert } from '../../redux/patients';

import Notification from './../Notifications/Notification';

class Patients extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    pager: PropTypes.object,
    isSuccess: PropTypes.object,
    isError: PropTypes.any,
    fetchPatients: PropTypes.func.isRequired,
    fetchPatient: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired,
    hideAlert: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchPatients();
  }

  handlePaginateLink(e, link) {
    e.preventDefault();
    
    this.props.fetchPatients(link);
  }

  handleEdit = (e, id) => {
    e.preventDefault();

    this.props.fetchPatient(id);

    this.props.history.push(`/patients/edit/${id}`)
  }

  handleDelete = (e, id) => {
    e.preventDefault();

    if(window.confirm(`Are you sure to delete this patient (ID: ${id}) ?`)) {
      this.props.deletePatient(id)
    }
  }

  render() {
    const { patients, pager, isSuccess, isError } = this.props;
    
    const setPageItemClass = (link) => link ? "page-item" : "page-item disabled";
    const setCurrentPageClass = (page) => page === pager.current_page ? "page-item active" : "page-item";

    return (
      <div className="animated fadeIn">

        { isSuccess && isSuccess.status && (
          <Notification
            type={ 'success' }
            message={ isSuccess.message }
            toggle={() => this.props.hideAlert()} />
        )}
        
        { isError && (
          <Notification
            type={ 'danger' }
            message={ isError.message }
            toggle={() => this.props.hideAlert()} />
        )}

        <Row>
          <Col xs="12" md="12" sm="6">
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
                      <tr key={ patient.id+patient.hn }>
                        <td>{ patient.id }</td>
                        <td>{ patient.hn }</td>
                        <td>{ patient.pname + patient.fname + ' ' + patient.lname }</td>
                        <td>{ patient.tel }</td>
                        <td style={{ textAlign: "center" }}>
                          <Link
                            to={`/patients/edit/${patient.id}`}
                            className="btn btn-warning btn-sm mr-1"
                            onClick={e => this.handleEdit(e, patient.id)}
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link 
                            to={`/patients/delete/${patient.id}`}
                            className="btn btn-danger btn-sm"
                            onClick={e => this.handleDelete(e, patient.id)}
                          >
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

                      { Array.from({ length: pager.last_page}, (val, key) => (
                        <li className={setCurrentPageClass(key+1)} aria-current="page" key={key+1}>
                          <a 
                            className="page-link" 
                            href="#"
                            onClick={e => this.handlePaginateLink(e, `${pager.path}?page=${key+1}`)}
                          >
                              {key+1} <span className="sr-only">(current)</span>
                          </a>
                        </li>                    
                      ))}

                      <li className={setPageItemClass(pager.next_page_url)}>
                        <a 
                          href="#"
                          className="page-link"
                          onClick={e => this.handlePaginateLink(e, pager.next_page_url)}>Next</a>
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
  isSuccess: state.patient.success,
  isError: state.patient.errors
});

export default connect(
  mapStateToProps,
  {
    fetchPatients,
    fetchPatient,
    deletePatient,
    hideAlert
  }
)(Patients);
