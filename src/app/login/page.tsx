import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import connectToDB from "@/database";
import { ToastContainer, toast } from "react-toastify";
const Page = () => {
  const loginHandler = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;
    if (!email || !password) throw new Error("Please provide all fields");
    await connectToDB();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log("Login failed:", result.error);
      throw new Error(result.error);
    }
    redirect("/");
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Login here .</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginHandler} className=" flex flex-col gap-4">
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
        <CardFooter className=" flex flex-col gap-4">
          <span>Or</span>
          <form action={async ()=> {
            "use server";
            await signIn("google")
          }}>
            <Button type="submit" variant={"outline"}>
              Login with Google
            </Button>
          </form>
          <Link href={"/signup"}>Don't have an account ? Signup</Link>
        </CardFooter>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </div>
  );
};

export default Page;
