import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInAction } from "./actions";

export default function SignIn() {
  return (
    <section className="h-dvh flex flex-col justify-center p-5">
      <h1 className="text-3xl text-center font-bold">Welcome to Sheltr</h1>
      <p className="text-center text-gray-600">
        Crowdsourced disaster overwatch
      </p>
      <form className="flex flex-col my-5 gap-5">
        <Label className="flex flex-col gap-3">
          <span className="font-bold t">Email</span>
          <Input
            name="email"
            placeholder="Enter your email"
            type="text"
            className="py-6"
            required
          ></Input>
        </Label>
        <Label className="flex flex-col gap-3">
          <span className="font-bold">Password</span>
          <Input
            name="password"
            placeholder="Enter your password"
            type="password"
            className="py-6"
            required
          ></Input>
        </Label>
        <Button
          className="w-full font-bold h-[50px]"
          type="submit"
          formAction={signInAction}
        >
          Login
        </Button>
      </form>
      <section className="flex justify-between">
        <Link href="/forgot-password" className="font-bold text-blue-600">
          Forgot Password?
        </Link>
        <Link href="/sign-up" className="font-bold text-blue-600">
          Sign Up
        </Link>
      </section>
    </section>
  );
}
