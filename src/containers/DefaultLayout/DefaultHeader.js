import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

import NavItemPopup from '../../components/Layouts/NavItemPopup';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ popup: !this.state.popup })
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const BASE_URL = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_BASE_URL : '../..';

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>        
        <Nav className="ml-auto" navbar>
          {/* ================== Notifications ================== */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="icon-bell"></i>
              <Badge pill color="danger">5</Badge>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>You have 5 notifications</strong></DropdownItem>
              <DropdownItem><i className="icon-user-follow text-success"></i> New user registered<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="icon-user-unfollow text-danger"></i> User deleted<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="icon-chart text-info"></i> Sales report is ready<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="icon-basket-loaded text-primary"></i> New client<Badge color="primary">42</Badge></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/* ================== Notifications ================== */}

          {/* ================== tasks ================== */}
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-list"></i>
              <Badge pill color="warning">15</Badge>
            </NavLink>
          </NavItem>
          {/* ================== tasks ================== */}

          {/* ================== messages ================== */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="icon-envelope-letter"></i>
              <Badge pill color="info">7</Badge>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>You have 7 messages</strong></DropdownItem>
              <DropdownItem><i className="icon-user-follow text-success"></i> New user registered<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="icon-user-unfollow text-danger"></i> User deleted<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="icon-chart text-info"></i> Sales report is ready<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="icon-basket-loaded text-primary"></i> New client<Badge color="primary">42</Badge></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/* ================== messages ================== */}

          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>            
          </NavItem>
          
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={`${BASE_URL}/assets/img/avatars/1.jpg`} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
