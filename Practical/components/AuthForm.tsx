"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import Image from "next/image"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})



const AuthForm = ({type}:{type: FormType}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
    
  const isSignIn = type === "sign-in";
  return (
      <div className="card-border lg:min-w-[566px]">
          <div className="flex flex-col gap-6 card py-14 px-10">
              <div className="flex flex-row gap-2 justify-center ">
                
                  <Image src="/favicon.ico" alt="logo" height={32} width={38} />
                  <h3 className="text-primary-100">Practical</h3>
              </div>
            
              <h4>Your Best Place to practice your Job Interview.</h4>
          
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 mt-4 form">
                      {isSignIn && <p>Name</p>}

            <Button type="submit">Submit</Button>
        </form>
        </Form>
          </div>
      </div>
  )
}

export default AuthForm