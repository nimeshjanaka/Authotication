"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/verifyemail?token=${token}`);
      const data = await response.json();
      if (response.ok) {
        toast("Email verified successfully!");
        router.push("/auth/signin");
      } else {
        toast.error("Failed to verify email.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Error verifying email.");
    }
  };

  function handleVerify() {
    if (token) {
      verifyEmail(token as string);
    }
  }

  return (
    <div className="flex items-center justify-center mt-20 ">
      <Card className="shadow-1xl p-12 bg-slate-200 mb-10">
        <CardBody className="text-lg">Verify Your Email..</CardBody>
        <Card>
          <Button color="primary" onClick={handleVerify}>
            Verify Email
          </Button>
        </Card>
      </Card>
    </div>
  );
};

export default page;
