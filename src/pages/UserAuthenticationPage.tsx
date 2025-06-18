import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // For simple forms if not using react-hook-form fully
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TriangleAlert } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters."}),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const UserAuthenticationPage: React.FC = () => {
  console.log('UserAuthenticationPage loaded');
  const [activeTab, setActiveTab] = useState("login");
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: ""},
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // Mock login
    if (data.email === "user@example.com" && data.password === "password123") {
      setFormMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      // Add actual redirect logic here
    } else {
      setFormMessage({ type: 'error', text: 'Invalid email or password.' });
      loginForm.reset();
    }
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    console.log("Register data:", data);
    setFormMessage({ type: 'success', text: 'Registration successful! Please check your email to verify.' });
    registerForm.reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <NavigationMenu siteName="SkyTech Clone" />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {activeTab === 'login' ? 'Welcome Back!' : 'Create an Account'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'login' ? 'Sign in to continue to SkyTech Clone.' : 'Join us to get the latest tech insights.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formMessage && (
                <Alert variant={formMessage.type === 'error' ? 'destructive' : 'default'} className="mb-4">
                  {formMessage.type === 'error' && <TriangleAlert className="h-4 w-4" />}
                  <AlertTitle>{formMessage.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                  <AlertDescription>{formMessage.text}</AlertDescription>
                </Alert>
              )}
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                      {loginForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                     <div className="text-sm text-center">
                        <Link to="#" className="font-medium text-primary hover:underline">Forgot password?</Link>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                     <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="yourusername" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
                       {registerForm.formState.isSubmitting ? 'Registering...' : 'Create Account'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
      <Footer siteName="SkyTech Clone" />
    </div>
  );
};

export default UserAuthenticationPage;