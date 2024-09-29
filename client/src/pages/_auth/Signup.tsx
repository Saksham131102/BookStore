import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import useSignup from "@/hooks/useSignup";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const Signup = () => {
  const { loading, signup } = useSignup();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    await signup(data);
  }

  return (
    <div className="p-10 flex flex-col gap-3 items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-semibold">Signup</h1>
      <div className="w-full sm:w-full md:w-2/3 lg:w-1/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {loading ? (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex items-end gap-2">
        <span>Already have an account?</span>
        <Link to="/login" className="text-blue-600 underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
