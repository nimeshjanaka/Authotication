import SignUpForm from "@/app/components/SignUpForm";
import { Image, Link } from "@nextui-org/react";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center">
      <div className="md:col-span-2 flex justify-center">
        <p>Already Signed up?</p>
        <Link href={"/auth/signin"}>Sign In</Link>
      </div>
      <SignUpForm />
      <Image src="/login.png" alt="Login Form" width={500} height={400} />
    </div>
  );
};

export default SignupPage;
