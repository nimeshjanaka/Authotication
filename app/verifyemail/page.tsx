"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

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

        router.push("/dashboard");
      } else {
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  function handleVerify() {
    if (token) {
      verifyEmail(token as string);
    }
  }

  return (
    <div>
      <Button onClick={handleVerify}>Verify Email</Button>
    </div>
  );
};

export default page;
