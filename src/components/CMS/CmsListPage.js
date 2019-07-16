import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import { Redirect, Link } from 'react-router-dom';

import * as TYPES from '../../constants/actions';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { withEmailVerification, withAuthorization } from '../Session';

class CmsListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      redirectToAddCmsPage: false
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
    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['title'] }),
        filterAll: true,
        Cell: row => <Link to={'/cms-edit/' + row.original.slug}>{row.original.title}</Link>
      },
      {
        Header: 'Slug',
        accessor: 'slug',
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['slug'] }),
        filterAll: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['status'] }),
        filterAll: true
      }
    ];

    return (
      <div>
        {this.state.redirectToAddCmsPage && <Redirect to="/cms-edit/new-page" />}
        <h1>CMS Pages</h1>
        <div>
          <input
            type="submit"
            value="Add New CMS Page"
            className="btn btn-primary my-2"
            onClick={() => this.setState({ redirectToAddCmsPage: true })}
          />
          <ReactTable
            data={pages}
            columns={columns}
            defaultPageSize={10}
            loading={loading}
            filterable={true}
            className="-striped -highlight"
          />
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
