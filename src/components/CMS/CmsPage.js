import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import * as TYPES from '../../constants/actions';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
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
    const { pages, location } = this.props;
    if (pages.length === 0) {
      this.setState({ loading: true });
    }

    this.props.firebase.pages().on('value', snapshot => {
      this.props.onSetPages(snapshot.val(), location.pathname);
      this.props.onSetPage(getPageBySlug(pages, location.pathname));
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.pages().off();
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
  debugger;
  const page = pages.filter(
    page => page.slug === slug && page.status === 'published'
  );
  if (page) {
    return page[0];
  }
  return null;
};

const mapStateToProps = state => ({
  page: state.pageState.page,
  pages: Object.keys(state.pageState.pages || {}).map(key => ({
    ...state.pageState.pages[key],
    uid: key
  }))
});

/* const mapStateToProps = (state, ownProps) => {
  let pageSlug = ownProps.location.pathname;
  
  const page =
    pageSlug &&
    state.pageState.pages &&
    state.pageState.pages.length > 0
      ? getPageBySlug(state.pageState.pages, pageSlug)
      : newPage;

  return {
    page: page,
    pages: state.pageState.pages
  };
};
 */
const mapDispatchToProps = dispatch => ({
  onSetPages: (pages, slug) =>
    dispatch({ type: TYPES.LOAD_PAGES_SUCCESS, pages, slug }),
  onSetPage: page => dispatch({ type: TYPES.LOAD_PAGE_SUCCESS, page })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CmsPage);
