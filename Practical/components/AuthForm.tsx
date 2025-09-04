"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
 
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { auth } from "@/firebase/client"


const authFormSchema = (type: FormType) => {
  return z.object({
    email: z.string().min(5).max(100).email(),
    password: z.string().min(6).max(100),
    name: type === "sign-up" ? z.string().min(5) : z.string()
  })
}


const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email: email,
          password: password,
        });

        console.log('this are the values', values);

        if (!result?.success) {
          console.log('this is the error in',!result?.success);
          toast.error(`signup error: ${result?.message}`);
          console.error('this is the error',result?.message);
          return;

        }
        console.log("Creating account with values:", values);
        toast.success("Account created successfully. Please Sign in.");
        router.push("/");
      }
        
      else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        const idToken = await userCredentials.user.getIdToken();

        if(!idToken) {
          toast.error("Sign in Failed");
          return;
        }

        await signIn({
          email,
          idToken,
        })

        console.log("Signing in with values:", values);
        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch(error) {
      console.error(error);
      toast.error("An error occurred while processing your request. Please try again later.");
    }
  }
    
  const isSignIn = type === "sign-in";
  return (
      <div className="card-border lg:min-w-[566px]">
          <div className="flex flex-col gap-6 card py-14 px-10">
              <div className="flex flex-row gap-2 justify-center ">
                
                  <Image src="/favicon.ico" alt="logo" height={32} width={38} />
                  <h3 className="text-primary-100">Practical</h3>
              </div>
            
              <h4 className="text-center ">Your Best Place to practice your Job Interview.</h4>
          
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter Your name"
                type="text"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email address"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your Password"
              type="password"
            />

            

            <Button className="btn" type="submit" onClick={form.handleSubmit(onSubmit)}>{ isSignIn ? "Sign In" : "Create an Account" }</Button>
        </form>
        </Form>

        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
            {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
          </div>
      </div>
  )
}

export default AuthForm