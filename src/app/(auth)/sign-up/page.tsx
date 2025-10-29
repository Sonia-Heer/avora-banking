import AuthForm from "@/components/AuthForm";
import React from "react";

const SignUp = async () => {
  return (
    <section className="flex items-center justify-center">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUp;
