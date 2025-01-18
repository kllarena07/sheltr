import { forgotPasswordAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Profile() {
  return (
    <section>
      <Link href="/">Logout</Link>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Enter your email" required />
          <Button formAction={forgotPasswordAction}>Reset Password</Button>
        </div>
      </form>
    </section>
  );
}
