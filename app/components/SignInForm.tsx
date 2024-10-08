"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success(`welcome ${data.email}`);
    router.push(props.callbackUrl ? props.callbackUrl : "/dashboard");
  };

  return (
    <Card className="p-3 mt-16">
      <CardBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 border rounded-md shadow overflow-hidden w-96 h-84 m-6 rounded bg-blue mt-8 justify-center "
        >
          <div className=" p-2 text-center rounded h-12  place-self-stretch shadow border rounded-md">
            Sign In Form
          </div>
          <div className="p-4 flex flex-col gap-4 ">
            <Input
              placeholder="Email"
              {...register("email")}
              errorMessage={errors.email?.message}
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
            />
            <Input
              classNames={{
                inputWrapper: "border-none",
                input: "border-none bg-offwhite",
              }}
              placeholder="Password"
              {...register("password")}
              type={visiblePass ? "text" : "password"}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  type="button"
                  onClick={() => setVisiblePass((prev) => !prev)}
                >
                  {visiblePass ? (
                    <EyeSlashIcon className="w-4" />
                  ) : (
                    <EyeIcon className="w-4" />
                  )}
                </button>
              }
            />
            <Link href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
            <div className="flex items-center justify-center gap-2 ">
              <Button
                color="primary"
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
              <Button as={Link} href="/auth/signup">
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default SignInForm;
