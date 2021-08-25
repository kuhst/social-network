import React from "react";
import s from "./Users.module.css";
import { Form, Formik } from "formik";
import { FilterType } from "../../redux/UsersReducer";
import { useSelector } from "react-redux";
import { getUserFilter } from "../../redux/usersSelector";
import { Input, Radio, SubmitButton } from "formik-antd";
import { Space } from "antd";
import style from "../../Style.module.css";

const usersSearchFormValidate = () => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
  isFetching: boolean;
};

type FriendFormType = "true" | "false" | "null";
type FormType = {
  term: string;
  friend: FriendFormType;
};

const UsersSearchForm: React.FC<PropsType> = React.memo(
  ({ onFilterChanged, isFetching }) => {
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
            <Form
              className={style.block}
              style={{
                padding: 20,
                paddingRight: 30,
              }}
            >
              <Space>
                <Space size={0}>
                  <Input
                    name='term'
                    type='search'
                    placeholder='Search user'
                    style={{ width: 320, borderRight: 0 }}
                  />
                  <SubmitButton
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    disabled={isFetching}
                  >
                    Search
                  </SubmitButton>
                </Space>
                <Space
                  style={{
                    paddingLeft: 20,
                  }}
                >
                  <Radio.Group
                    name='friend'
                    defaultValue='null'
                    buttonStyle='solid'
                    size='small'
                  >
                    <Radio name='friend' value='null'>
                      All
                    </Radio>
                    <Radio name='friend' value='true'>
                      Only followed
                    </Radio>
                    <Radio name='friend' value='false'>
                      Only unfollowed
                    </Radio>
                  </Radio.Group>
                </Space>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

export default UsersSearchForm;
