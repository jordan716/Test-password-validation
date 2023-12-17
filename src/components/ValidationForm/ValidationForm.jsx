import React from "react";
import "./ValidationForm.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MESSAGES } from "../../constants/validationForm";

const schema = yup.object().shape({
  password: yup
    .string()
    .required(MESSAGES.required)
    .min(6, MESSAGES.minLength)
    .matches(/[A-Z]/, MESSAGES.uppercase)
    .matches(/[a-z]/, MESSAGES.lowercase)
    .matches(/\d/, MESSAGES.number)
    .matches(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/, MESSAGES.special),
  confirmPassword: yup
    .string()
    .required(MESSAGES.confirm)
    .oneOf([yup.ref("password")], MESSAGES.match),
});

export const ValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="password">Password:</label>
      <input type="password" {...register("password")} />
      <p>{errors?.password?.message}</p>

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" {...register("confirmPassword")} />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      {isValid && <p className="success">{MESSAGES.success}</p>}

      <input type="submit" />
    </form>
  );
};
