import React from "react";
import s from "./Users.module.css";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/UsersReducer";

const usersSearchFormValidate = () => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = React.memo(
  ({ onFilterChanged }) => {
    const submit = (
      values: FilterType,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      onFilterChanged(values);
      setSubmitting(false);
    };

    return (
      <div className={s.usersSearch}>
        <Formik
          initialValues={{ term: "", friend: "" }}
          validate={usersSearchFormValidate}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type='term' name='term' />
              <Field as='select' name='friend'>
                <option value='null'>All</option>
                <option value='true'>Only followed</option>
                <option value='false'>Only unfollowed</option>
              </Field>
              <button type='submit' disabled={isSubmitting}>
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

export default UsersSearchForm;
