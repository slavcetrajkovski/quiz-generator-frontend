"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "@/service/user-service";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/model";
import { ProfileSchema } from "@/schema";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

type ProfileFormData = z.infer<typeof ProfileSchema>;

export const ProfileForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getCurrentUser();
        setUser(u);
        form.reset({ name: u.name, email: u.email });
      } catch (error) {
        toast.error("You must be logged in.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [form, router]);

  const onSubmit = async (values: ProfileFormData) => {
    if (!user) return;

    try {
      const updated = await updateUser({
        name: values.name,
        email: values.email,
      });

      setUser(updated);
      setEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <Spinner />;
  if (!user)
    return (
      <div className="p-10 text-center text-red-500">
        Could not fetch your profile.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile Information</h1>
        {!editing && (
          <Button onClick={() => setEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {editing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  form.reset({ name: user.name, email: user.email });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!form.formState.isValid}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-sm text-muted-foreground">Name</h2>
            <p className="text-lg">{user.name}</p>
          </div>
          <div>
            <h2 className="text-sm text-muted-foreground">Email</h2>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <h2 className="text-sm text-muted-foreground">Role</h2>
            <p className="text-lg capitalize">{user.role.toLowerCase()}</p>
          </div>
          <div>
            <h2 className="text-sm text-muted-foreground">Member Since</h2>
            <p className="text-lg">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
