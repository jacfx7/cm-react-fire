import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as TYPES from '../../constants/actions';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { newPage } from '../../constants/propTypes';
import PageContent from './PageContent';
import PageNotFound from './PageNotFound';

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

  render() {
    const { page } = this.props;
    return (
      <>
        {page ? (
          <PageContent sourceHtml={page.pageContent} />
        ) : (
          <PageNotFound />
        )}
      </>
    );
  }
}

const getPageBySlug = (pages, slug) => {
  debugger;
  const page = pages.filter(
    page => page.slug === slug && page.status === 'published'
  );
  if (page) {
    return page[0];
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  let pageSlug = ownProps.location.pathname;
  if (pageSlug === '/') {
    pageSlug = 'home-page';
  } else {
    pageSlug = pageSlug.replace('/', '');
  }
  const page =
    pageSlug &&
    state.pageState.pages &&
    state.pageState.pages.length > 0
      ? getPageBySlug(state.pageState.pages, pageSlug)
      : newPage;

  return {
    page,
    pages: state.pageState.pages
  };
};

const mapDispatchToProps = dispatch => ({
  onSetPages: pages =>
    dispatch({ type: TYPES.LOAD_PAGES_SUCCESS, pages })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CmsPage);
