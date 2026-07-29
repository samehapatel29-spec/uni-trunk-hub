import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, Lock, User, Hash, School } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name is required").optional(),
  rollNo: z.string().min(3, "Roll number is required").optional(),
  department: z.string().min(1, "Department is required").optional(),
});

type AuthMode = "signin" | "signup";

export function AuthDialog({ 
  children, 
  mode: initialMode = "signin" 
}: { 
  children: React.ReactNode;
  mode?: AuthMode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      rollNo: "",
      department: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              full_name: values.fullName,
              roll_no: values.rollNo,
              department: values.department,
              verification_status: 'pending'
            },
          },
        });
        
        if (signUpError) throw signUpError;
        
        toast.success("Account created! Waiting for admin verification.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        
        if (signInError) throw signInError;
        
        // Check verification status after sign in
        const { data: profile } = await supabase
          .from('profiles')
          .select('verification_status')
          .single();
          
        if (profile?.verification_status === 'pending') {
          toast.info("Your account is still under verification by the admin.");
        } else {
          toast.success("Welcome back!");
        }
      }
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Student Sign In" : "Student Registration"}</DialogTitle>
          <DialogDescription>
            {mode === "signin" 
              ? "Access your campus marketplace." 
              : "Register with your details for admin verification."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {mode === "signup" && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="John Doe" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="rollNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roll Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="CS101" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative">
                              <School className="absolute left-3 top-2.5 z-10 h-4 w-4 text-muted-foreground pointer-events-none" />
                              <SelectTrigger className="pl-9">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Arts">Arts</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="you@example.com" {...field} />
                    </div>
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
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" type="password" placeholder="••••••••" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4 bg-gradient-primary shadow-[var(--shadow-glow)]" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                mode === "signin" ? "Sign In" : "Register for Verification"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-2">
              {mode === "signin" ? (
                <p>
                  New student?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-semibold text-primary hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
