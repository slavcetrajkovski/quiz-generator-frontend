"use client";

import { useState, useEffect } from "react";
import { UserDTO, getCurrentUser, updateUser } from "../_services/user-service";
import { toast } from "react-hot-toast";

export const ProfileForm = () => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", role: "USER" });

    useEffect(() => {
        getCurrentUser()
            .then((u) => {
                setUser(u);
                setForm({ name: u.name, email: u.email, role: u.role });
            })
            .catch(() => toast.error("Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            const currentUser = await getCurrentUser();

            const updatedUser = {
                ...currentUser,
                name: form.name,
                email: form.email,
                role: form.role
            };

            const updated = await updateUser(user.id, updatedUser);
            setUser(updated);
            setEditing(false);
            toast.success("Profile updated!");
        } catch {
            toast.error("Update failed");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading…</div>;
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
                    <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {editing ? (
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        >
                            <option value="PROFESSOR">Professor</option>
                            <option value="STUDENT">Student</option>
                            <option value="USER">User</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setForm({ name: user.name, email: user.email, role: user.role });
                            }}
                            className="px-4 py-2 border rounded-md hover:bg-accent/10"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
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