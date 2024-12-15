// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/hooks/use-toast";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { updateUserAccount, createFeatureRequest } from "@/app/actions/user";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// // Schema Definitions
// const accountFormSchema = z.object({
//   name: z.string().min(2).max(30),
//   email: z.string().email(),
//   phoneNumber: z.string().min(10).max(15),
// });

// const featureRequestSchema = z.object({
//   title: z.string().min(4).max(100),
//   description: z.string().min(10).max(500),
// });

// export default function AccountPage({ user }) {
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(accountFormSchema),
//     defaultValues: {
//       name: user.name || "",
//       email: user.email || "",
//       phoneNumber: user.phoneNumber || "",
//     },
//   });

//   const featureRequestForm = useForm({
//     resolver: zodResolver(featureRequestSchema),
//     defaultValues: { title: "", description: "" },
//   });

//   async function onSubmit(data) {
//     setIsLoading(true);
//     try {
//       const result = await updateUserAccount(user.id, data);
//       if (result.success) {
//         toast({
//           title: "Account updated",
//           description: "Your account has been updated successfully.",
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: result.error,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function onFeatureRequestSubmit(data) {
//     setIsLoading(true);
//     try {
//       const result = await createFeatureRequest(user.id, data);
//       if (result.success) {
//         toast({
//           title: "Feature request submitted",
//           description: "Your feature request has been submitted successfully.",
//         });
//         featureRequestForm.reset();
//       } else {
//         toast({
//           title: "Error",
//           description: result.error,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex gap-2">
//         <Button asChild variant="ghost" className="mb-6">
//           <Link href="/admin">
//             <ArrowLeft className="h-6 w-6" />
//           </Link>
//         </Button>
//         <div>
//           <h1 className="text-2xl font-bold">Account Settings</h1>
//           <p className="text-sm text-muted-foreground">
//             Manage your account settings and set your preferences.
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-2 w-full">
//         <div className="w-2/3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Account Information</CardTitle>
//               <CardDescription>
//                 Update your account information.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-8"
//                 >
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your email" {...field} disabled />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="phoneNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your phone number" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button type="submit" disabled={isLoading}>
//                     {isLoading ? "Saving..." : "Save Changes"}
//                   </Button>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateUserAccount } from "@/app/actions/user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Schema Definition
const accountFormSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15),
});

export default function AccountPage({ user }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const result = await updateUserAccount(user.id, data);
      if (result.success) {
        toast({
          title: "Account updated",
          description: "Your account has been updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/admin">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and set your preferences.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 w-full">
        <div className="w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                          <Input placeholder="Your email" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
