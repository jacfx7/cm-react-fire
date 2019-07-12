import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'recompose';

import ManageCmsForm from './ManageCmsForm';
import Spinner from '../Spinner';
import * as TYPES from '../../constants/actions';
import { withFirebase } from '../Firebase';

const newPage = {
  id: null,
  title: '',
  slug: '',
  status: 'draft',
  createdAt: null,
  publishedAt: null,
  author: null,
  pageContent: ''
};

class ManageCmsPage extends Component {
  state = {
    page: { ...this.props.page },
    errors: {},
    saving: false
  };

  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  componentDidMount() {
    const { pages } = this.props;
    if (pages.length === 0) {
      this.props.firebase.pages().on('value', snapshot => {
        this.props.onSetPages(snapshot.val());
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.page.id !== state.page.id) return { page: props.page };
    return null;
  }

  formIsValid() {
    const { title } = this.state.page;
    const errors = {};
    if (!title) errors.title = 'Title is required';
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSave = event => {
    event.preventDefault();
    if (!this.formIsValid()) return;
    this.setState({ saving: true });
    this.props.actions
      .savePage(this.state.page)
      .then(() => {
        this.setState({
          saving: false
        });
        toast.success('Page saved.');
      })
      .catch(error => {
        this.setState({
          saving: false,
          errors: { onSave: error.message }
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.handleStateChange(name, value);
    if (name === 'title') {
      this.handleStateChange('slug', value.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase());
    }
    if (name === 'status' && value !== 'archived') {
      if (value === 'published' && !this.state.page.publishedAt) {
        this.handleStateChange('publishedAt', Date.now());
      } else if (value === 'draft') {
        this.handleStateChange('publishedAt', '');
      }
    }
  };

  handleDateChange = date => {
    this.handleStateChange('publishedAt', date);
  };

  handleEditorChange = content => {
    this.handleStateChange('pageContent', content);
  };

  handleStateChange(property, value) {
    this.setState(prevState => {
      return {
        page: {
          ...prevState.page,
          [property]: value
        }
      };
    });
  }

  render() {
    return this.props.pages.length === 0 ? (
      <Spinner />
    ) : (
      <ManageCmsForm
        page={this.state.page}
        onSave={this.handleSave}
        onChange={this.handleChange}
        onEditorChange={this.handleEditorChange}
        onDateChange={this.handleDateChange}
        saving={this.state.saving}
        errors={this.state.errors}
      />
    );
  }
}

const getPageBySlug = (pages, slug) => {
  const page = pages.filter(page => page.slug === slug && page.status === 'published');
  if (page) {
    return page[0];
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  /* if (state.pages.length === 0) {
    actions.loadPages();
  } */
  let pageSlug = ownProps.match.params.length === 0 ? 0 : ownProps.match.params.slug;
  const pages = Object.keys(state.pageState.pages || {}).map(key => ({
    ...state.pageState.pages[key],
    uid: key
  }));

  const page = pageSlug && pages.length > 0 ? getPageBySlug(pages, pageSlug) : newPage;
  return {
    page,
    pages: pages,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = dispatch => ({
  onSetPages: pages => dispatch({ type: TYPES.LOAD_PAGES_SUCCESS, pages }),
  onSetPage: page => dispatch({ type: TYPES.LOAD_PAGE_SUCCESS, page })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ManageCmsPage);
