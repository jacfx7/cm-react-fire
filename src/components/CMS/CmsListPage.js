import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import MaterialTable from 'material-table';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as TYPES from '../../constants/actions';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { withEmailVerification, withAuthorization } from '../Session';

class CmsListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { pages } = this.props;
    if (pages.length === 0) {
      this.setState({ loading: true });
    }
    this.props.firebase.pages().on('value', snapshot => {
      this.props.onSetPages(snapshot.val());
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.pages().off();
  }

  render() {
    const { pages, loading } = this.props;
    const cellStyle = {
      padding: '5px'
    };

    const columns = [
      {
        title: '',
        field: 'slug',
        render: rowData => (
          <div style={{ textAlign: 'center' }}>
            <Tooltip title="View Details" aria-label="View Details" placement="top">
              <IconButton
                color="primary"
                aria-label="View Details"
                to={`${ROUTES.ADMIN_CMS_PAGE}/${rowData.slug}`}
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
        title: 'Title',
        field: 'title'
      },
      {
        title: 'Slug',
        field: 'slug'
      },
      {
        title: 'Status',
        field: 'status'
      }
    ];

    return (
      <div>
        <div>
          <Button
            className="my-3"
            variant="contained"
            color="primary"
            to={`${ROUTES.ADMIN_CMS_PAGE}/new-page`}
            component={Link}
          >
            <AddIcon className="mx-2">send</AddIcon>
            Add New CMS Page
          </Button>
          {loading ? <CircularProgress /> : <MaterialTable title="CMS Pages" columns={columns} data={pages} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pages: Object.keys(state.pageState.pages || {}).map(key => ({
    ...state.pageState.pages[key],
    uid: key
  }))
});

const mapDispatchToProps = dispatch => ({
  onSetPages: pages => dispatch({ type: TYPES.LOAD_PAGES_SUCCESS, pages })
});

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CmsListPage);
