import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div className="flex items-center justify-center flex-col ">
      <SignInForm callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SigninPage;
