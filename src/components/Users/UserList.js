import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import MaterialTable from 'material-table';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as TYPES from '../../constants/actions';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());

      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.props;
    const { loading } = this.state;
    const cellStyle = {
      padding: '5px'
    };
    const columns = [
      {
        title: '',
        field: 'uid',
        render: rowData => (
          <div style={{ textAlign: 'center' }}>
            <Tooltip title="View Details" aria-label="View Details" placement="top">
              <IconButton
                color="primary"
                aria-label="View Details"
                to={`${ROUTES.ADMIN_USERS}/${rowData.uid}`}
                component={Link}
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </div>
        ),
        cellStyle: cellStyle
      },
      {
        title: 'Email',
        field: 'email',
        cellStyle: cellStyle
      },
      {
        title: 'Username',
        field: 'username',
        cellStyle: cellStyle
      },
      {
        title: 'Is Admin',
        field: 'isAdmin',
        render: rowData => <Checkbox checked={rowData.isAdmin} disabled />,
        cellStyle: cellStyle
      }
    ];

    return (
      <div>{loading ? <CircularProgress /> : <MaterialTable title="Registered Users" columns={columns} data={users} />}</div>
    );
  }
}

const mapStateToProps = state => ({
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key,
    isAdmin: state.userState.users[key].roles && state.userState.users[key].roles[ROLES.ADMIN] === 'ADMIN'
  }))
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: TYPES.USERS_SET, users })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserList);
