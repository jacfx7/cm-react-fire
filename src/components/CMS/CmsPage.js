import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as TYPES from '../../constants/actions';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import PageContent from './PageContent';
import PageNotFound from './PageNotFound';
import Spinner from '../Spinner';

class CmsPage extends Component {
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

  componentWillUpdate() {
    const { pages, location, page, lastLocation } = this.props;
    if (!page && pages.length > 0 && location.pathname !== lastLocation) {
      this.props.onSetPage(getPageBySlug(pages, location.pathname));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pages } = this.props;
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.onClearPage(this.props.location.pathname);
      this.props.onSetPage(getPageBySlug(pages, nextProps.location.pathname));
    }
  }

  componentWillUnmount() {
    this.props.firebase.pages().off();
    this.props.onClearPage();
  }

  render() {
    const { page, pages, authUser } = this.props;

    const isAdmin = authUser && !!authUser.roles[ROLES.ADMIN];
    return (
      <>
        {pages && pages.length > 0 ? page ? <PageContent sourceHtml={page.pageContent} /> : <PageNotFound /> : <Spinner />}
        {isAdmin && page && <Link to={ROUTES.EDIT_CMS + '/' + page.slug}>Edit Page</Link>}
      </>
    );
  }
}

CmsPage.propTypes = {
  page: PropTypes.object,
  pages: PropTypes.array.isRequired
};

const getPageBySlug = (pages, slug) => {
  if (slug === '/') {
    slug = 'home-page';
  } else {
    slug = slug.replace('/', '');
  }
  const page = pages.filter(page => page.slug === slug && page.status === 'published');
  if (page) {
    return page[0];
  }
  return null;
};

const mapStateToProps = state => ({
  lastLocation: state.pageState.lastLocation,
  page: state.pageState.page,
  pages: Object.keys(state.pageState.pages || {}).map(key => ({
    ...state.pageState.pages[key],
    uid: key
  })),
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetPages: pages => dispatch({ type: TYPES.LOAD_PAGES_SUCCESS, pages }),
  onSetPage: page => dispatch({ type: TYPES.LOAD_PAGE_SUCCESS, page }),
  onClearPage: location => dispatch({ type: TYPES.CLEAR_PAGE_SUCCESS, location })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CmsPage);
