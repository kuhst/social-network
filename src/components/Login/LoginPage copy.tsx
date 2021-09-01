import React from "react";
import BigButton from "../elements/BigButton";
import s from "./Login.module.css";
import style from "../../Style.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/AuthReducer";
import Element, { createField } from "../elements/FormsControls";
import { required } from "../../utils/validators";
import { Redirect } from "react-router-dom";
import { getCaptchaURL, getIsAuth } from "../../redux/authSelector";
import { useEffect } from "react";

const Input = Element("input");

type LoginFormOunProps = {
  captchaURL: string | null;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormValuesTypeKeys = keyof LoginFormValuesType;

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOunProps> & LoginFormOunProps
> = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit} className={s.inputBlock}>
      {createField<LoginFormValuesTypeKeys>(
        "eMail",
        "email",
        [required],
        Input
      )}
      {createField<LoginFormValuesTypeKeys>(
        "Password",
        "password",
        [required],
        Input,
        "",
        { type: "password" }
      )}
      {error && <div className={style.errorSubmitForm}>{error}</div>}
      {captchaURL && (
        <>
          <div className={s.captcha}>
            <img src={captchaURL} alt='captcha'></img>
          </div>

          {createField<LoginFormValuesTypeKeys>(
            "Wrote symbols what you see",
            "captcha",
            [required],
            Input
          )}
        </>
      )}
      <div className={s.sendBlock}>
        {createField<LoginFormValuesTypeKeys>(
          undefined,
          "rememberMe",
          [],
          Input,
          "Remember me",
          { type: "checkbox" }
        )}
        <BigButton value='Sign in' />
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOunProps>({
  form: "login",
})(LoginForm);

export const LoginPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  const isAuth = useSelector(getIsAuth);
  const captchaURL = useSelector(getCaptchaURL);

  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      logIn(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };

  if (isAuth) return <Redirect to={"/profile"} />;
  return (
    <div className={s.loginBackground}>
      <div className={style.block + " " + s.container}>
        <div className={style.blockName}>Sign in</div>
        <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
      </div>
    </div>
  );
};
