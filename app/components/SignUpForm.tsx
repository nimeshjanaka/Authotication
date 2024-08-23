"use client";

import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordStrength from "./PasswordStrength";
import { registerUser, sendEmail } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { log } from "console";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(45, "First Name must be less than 45 characters")
      .regex(/^[a-zA-Z]+$/, "No special characters allowed"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(45, "Last Name must be less than 45 characters")
      .regex(/^[a-zA-Z]+$/, "No special characters allowed"),

    email: z.string().email("Please enter a valid email address"),

    phone: z
      .string()
      .refine(
        (val) => validator.isMobilePhone(val),
        "Please enter a valid phone number"
      ),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),

    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),

    accepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const [passStrength, setPassStrength] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const calculatePassStrength = (password: string) => {
    if (password.length > 10) return 3;
    if (password.length > 7) return 2;
    if (password.length > 4) return 1;
    return 0;
  };

  useEffect(() => {
    const subscription = watch((value) => {
      const password = value.password || "";
      setPassStrength(calculatePassStrength(password));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const toggleVisiblePass = () => setIsVisible((prev) => !prev);

  const saveUser: SubmitHandler<FormSchemaType> = async (data) => {
    const { accepted, confirmPassword, ...user } = data;

    try {
      const result = await registerUser(user);
      toast.success("User registered successfully");

      console.log("result", result);

      if (!result) {
        toast.error("error");
        return;
      }
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Something went wrong");

      console.error(error);
    }
  };
  const router = useRouter();

  return (
    <Card className="p-3">
      <CardBody>
        <form onSubmit={handleSubmit(saveUser)}>
          <div className=" p-2 text-center rounded h-12  place-self-stretch shadow border rounded-md ">
            <h1>Sign Up Your Account</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 p-2 text-black">
            <Input
              errorMessage={errors?.firstName?.message}
              isInvalid={!!errors?.firstName}
              {...register("firstName")}
              // label="First Name"
              placeholder="First Name"
              startContent={<UserIcon className="w-6 " />}
              labelPlacement="outside"
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
            />
            <Input
              errorMessage={errors?.lastName?.message}
              isInvalid={!!errors?.lastName}
              {...register("lastName")}
              placeholder="Last Name"
              startContent={<UserIcon className="w-6 " />}
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
            />
            <Input
              errorMessage={errors?.email?.message}
              isInvalid={!!errors?.email}
              {...register("email")}
              className="col-span-2"
              placeholder="Email"
              startContent={<EnvelopeIcon className="w-6 " />}
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
            />
            <Input
              errorMessage={errors?.phone?.message}
              isInvalid={!!errors?.phone}
              {...register("phone")}
              className="col-span-2"
              placeholder="Phone"
              startContent={<PhoneIcon className="w-6 " />}
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
            />
            <Input
              errorMessage={errors?.password?.message}
              isInvalid={!!errors?.password}
              {...register("password")}
              className="col-span-2"
              placeholder="Password"
              type={isVisible ? "text" : "password"}
              startContent={<KeyIcon className="w-6 " />}
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
              endContent={
                isVisible ? (
                  <EyeSlashIcon
                    className="w-6 cursor-pointer"
                    onClick={toggleVisiblePass}
                  />
                ) : (
                  <EyeIcon
                    className="w-6 cursor-pointer"
                    onClick={toggleVisiblePass}
                  />
                )
              }
            />
            <PasswordStrength passStrength={passStrength} />
            <Input
              errorMessage={errors?.confirmPassword?.message}
              isInvalid={!!errors?.confirmPassword}
              {...register("confirmPassword")}
              className="col-span-2"
              placeholder="Confirm Password"
              type={isVisible ? "text" : "password"}
              startContent={<KeyIcon className="w-6 " />}
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
            />
            <Controller
              control={control}
              name="accepted"
              render={({ field }) => (
                <Checkbox
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="col-span-2"
                >
                  I agree to the <Link href="/terms">Terms</Link> and{" "}
                  <Link href="/conditions">Conditions</Link>
                </Checkbox>
              )}
            />
            {errors?.accepted && <p>{errors?.accepted?.message}</p>}
            <div className="md:col-span-1 flex justify-center items-center">
              <p className="text-center p-2 text-black ">Already Signed up?</p>
              <Link href={"/auth/signin"}>Sign In</Link>
            </div>
            <div className="flex justify-center col-span-2 ">
              <Button className="w-48" color="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default SignUpForm;
