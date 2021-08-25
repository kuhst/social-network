import React from "react";
import s from "./Users.module.css";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/UsersReducer";
import { useSelector } from "react-redux";
import { getUserFilter } from "../../redux/usersSelector";

const usersSearchFormValidate = () => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = "true" | "false" | "null";
type FormType = {
  term: string;
  friend: FriendFormType;
};

const UsersSearchForm: React.FC<PropsType> = React.memo(
  ({ onFilterChanged }) => {
    const submit = (
      values: { term: string; friend: string },
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      onFilterChanged({
        term: values.term,
        friend:
          values.friend === "null"
            ? null
            : values.friend === "true"
            ? true
            : false,
      });
      setSubmitting(false);
    };

    const filter = useSelector(getUserFilter);

    return (
      <div className={s.usersSearch}>
        <Formik
          enableReinitialize
          initialValues={{
            term: filter.term,
            friend: String(filter.friend) as FriendFormType,
          }}
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
