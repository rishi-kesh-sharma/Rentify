import PropTypes from 'prop-types';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '../../../../components/Basic/Checkbox';
import DatePickerField from '../../../../components/Basic/Datepicker';
import SelectField from '../../../../components/Basic/Select';
import TextField from '../../../../components/Basic/TextField';

const QuickEdit = (props) => {
  const {
    handleCheckedChange,
    handleChange,
    handleDropDownChange,
    handleMultipleSelectCategoryChange,
    handlePublishedOn,
    handleMultipleSelectAuthorChange,
  } = props;
  const {
    one,
    category,
    users,
    tempTag,
    tempMetaTag,
    tempMetaKeyword,
    errors,
  } = props;

  const [startDate, setStartDate] = useState(new Date());

  let listCategoryNormalized = {};
  const listCategory = category.map((each) => {
    const obj = {
      label: each.title,
      value: each._id,
    };
    listCategoryNormalized = {
      ...listCategoryNormalized,
      [each._id]: obj,
    };
    return obj;
  });

  return (
    <>
      <div>
        <TextField
          className="w-full pb-4"
          handleChange={handleChange('title')}
          id="rent_title"
          type="text"
          value={(one && one.title) || ''}
          error={errors && errors.title}
          label="Title"
        />
        <DatePickerField
          label="Published On"
          dateFormat="Pp"
          className="w-full pb-4"
          showTimeSelect
          value={
            one.published_on !== '' && one.published_on !== null
              ? new Date(one.published_on)
              : ''
          }
          onChange={handlePublishedOn}
        />
        <Checkbox
          checked={one.is_active || false}
          handleChange={handleCheckedChange('is_active')}
          name="is_active"
          label="Is Active"
        />
        <Checkbox
          checked={one.is_published || false}
          handleChange={handleCheckedChange('is_published')}
          name="is_published"
          label="Is Published"
        />
        <Checkbox
          checked={one.is_highlight || false}
          handleChange={handleCheckedChange('is_highlight')}
          name="is_highlight"
          label="Is Highlight"
        />
        <Checkbox
          checked={one.is_showcase || false}
          handleChange={handleCheckedChange('is_showcase')}
          name="is_showcase"
          label="Is Showcase"
        />
      </div>
    </>
  );
};

QuickEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  one: PropTypes.object.isRequired,
  category: PropTypes.string,
  tempTag: PropTypes.string,
};

export default QuickEdit;
