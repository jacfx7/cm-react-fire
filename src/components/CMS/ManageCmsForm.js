import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { DateTimePicker } from '@material-ui/pickers';
import { Editor } from '@tinymce/tinymce-react';

const ManageCmsForm = ({ page, onSave, onChange, onEditorChange, onDateChange, saving = false, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{page._id ? 'Edit' : 'Add'} CMS Page</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <Grid container alignItems="center" justify="flex-start">
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            value={page.title}
            placeholder="Title"
            required
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField name="slug" label="Slug" value={page.slug} placeholder="Slug" required fullWidth disabled />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel htmlFor="status-select">Status</InputLabel>
            <Select value={page.status} onChange={onChange} input={<Input name="status" id="status-select" />}>
              <MenuItem value={'draft'}>Draft</MenuItem>
              <MenuItem value={'published'}>Published</MenuItem>
              <MenuItem value={'archived'}>Archived</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <DateTimePicker
            name="createdAt"
            margin="normal"
            label="Created Date"
            value={page.createdAt}
            disabled
            onChange={onDateChange}
          />
        </Grid>
        <Grid item xs={3}>
          <DateTimePicker
            name="publishedAt"
            keyboard="true"
            margin="normal"
            label="Publish Date"
            value={page.publishedAt || null}
            onChange={onDateChange}
            showTodayButton
          />
        </Grid>
        <Grid item xs={12}>
          <Editor
            name="pageContent"
            apiKey={process.env.REACT_APP_TINY_API_KEY}
            initialValue={page.pageContent}
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
              height: 450
            }}
            onEditorChange={onEditorChange}
          />
        </Grid>
        <Grid item xs={3}>
          <button type="submit" disabled={saving} className="btn btn-primary my-2">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

ManageCmsForm.propTypes = {
  page: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default ManageCmsForm;
