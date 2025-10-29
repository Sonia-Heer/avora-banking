import AuthForm from "@/components/AuthForm";
import React from "react";

const SignIn = () => {
  return (
    <section className="flex items-center justify-center">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default SignIn;
