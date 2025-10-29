"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";
import ProgressBar from "./ProgressBar";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [validating, setValidating] = useState(false);

  const goToStep = (newStep: 1 | 2 | 3) => setStep(newStep);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password,
      };

      if (type === "sign-up") {
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const stepFields = {
    1: ["firstName", "lastName", "dateOfBirth"],
    2: ["address1", "city", "state", "postalCode", "ssn"],
    3: ["email", "password"],
  } as const;

  const handleNext = async () => {
    setValidating(true);
    const fieldsToValidate = stepFields[step];
    const isValid = await form.trigger(fieldsToValidate as any, {
      shouldFocus: true,
    });
    setValidating(false);

    if (isValid) goToStep((step + 1) as 1 | 2 | 3);
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col text-center justify-center gap-1 md:gap-3">
          <h1 className="text-[24px] lg:text-[36px] font-semibold text-foreground">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-foreground text-[16px] font-normal">
            {user
              ? "Link your account to get started"
              : "Please enter your details below"}
          </p>
        </div>
      </header>

      {type === "sign-up" && <ProgressBar step={step} totalSteps={3} />}

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              {type === "sign-up" && (
                <>
                  <div className="h-[350px]">
                    {step === 1 && (
                      <div className="flex flex-col gap-4">
                        <CustomInput
                          control={form.control}
                          name="firstName"
                          label="First Name"
                          placeholder="Enter your first name"
                        />
                        <CustomInput
                          control={form.control}
                          name="lastName"
                          label="Last Name"
                          placeholder="Enter your last name"
                        />
                        <CustomInput
                          control={form.control}
                          name="dateOfBirth"
                          label="Date of Birth"
                          placeholder="YYYY-MM-DD"
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-4">
                        <CustomInput
                          control={form.control}
                          name="address1"
                          label="Address"
                          placeholder="Enter your address"
                        />
                        <div className="flex gap-4">
                          <CustomInput
                            control={form.control}
                            name="city"
                            label="City"
                            placeholder="Enter your city"
                          />
                          <CustomInput
                            control={form.control}
                            name="state"
                            label="State"
                            placeholder="Example: NY"
                          />
                        </div>
                        <div className="flex gap-4">
                          <CustomInput
                            control={form.control}
                            name="postalCode"
                            label="Postal Code"
                            placeholder="Example: 11101"
                          />
                          <CustomInput
                            control={form.control}
                            name="ssn"
                            label="SSN"
                            placeholder="Example: 1234"
                          />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="flex flex-col gap-4">
                        <CustomInput
                          control={form.control}
                          name="email"
                          label="Email"
                          placeholder="Enter your email"
                        />
                        <CustomInput
                          control={form.control}
                          name="password"
                          label="Password"
                          placeholder="Enter your password"
                        />
                        <div className="flex flex-col gap-4 pt-8">
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="form-btn"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 size={20} className="animate-spin" />
                                &nbsp;Loading...
                              </>
                            ) : (
                              "Sign Up"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step navigation */}
                  <div className="flex justify-between">
                    {step > 1 && (
                      <Button
                        type="button"
                        className="form-btn"
                        onClick={() => goToStep((step - 1) as 1 | 2 | 3)}
                      >
                        Back
                      </Button>
                    )}

                    {step < 3 && (
                      <Button
                        type="button"
                        className="form-btn"
                        onClick={handleNext}
                        disabled={validating}
                      >
                        {validating ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            &nbsp;Checking...
                          </>
                        ) : (
                          "Next"
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}

              {type === "sign-in" && (
                <>
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                  <div className="flex flex-col gap-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="form-btn"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          &nbsp;Loading...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>

          <footer className="absolute top-0 right-0 flex items-center gap-1 p-8 text-tertiary-text">
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
