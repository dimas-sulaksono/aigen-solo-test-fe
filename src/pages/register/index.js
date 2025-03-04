import Register from "@/components/organism/Register";
import AuthLayout from "@/components/templates/AuthLayout";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <AuthLayout title="Create an account" type="register">
        <Register />
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
