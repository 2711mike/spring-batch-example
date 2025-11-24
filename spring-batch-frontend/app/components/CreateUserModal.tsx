"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export default function CreateUserModal({ open, onClose, onCreated }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    receiveCampaignEmails: false,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded bg-white p-6 dark:bg-zinc-900 dark:text-zinc-100">
        <h2 className="text-lg font-semibold mb-4">Create User</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            try {
              const payload = { ...form };
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                }
              );
              if (res.ok) {
                setForm({
                  email: "",
                  firstName: "",
                  lastName: "",
                  receiveCampaignEmails: false,
                });
                onClose();
                onCreated?.();
              } else {
                const err = await res.json();
                alert(err?.message ?? "Failed to create");
              }
            } catch (err) {
              console.error(err);
              alert("Failed to create");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div className="mb-3">
            <label className="block text-sm text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded border px-2 py-1 bg-white text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm text-zinc-700 dark:text-zinc-300">
              First Name
            </label>
            <input
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full rounded border px-2 py-1 bg-white text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm text-zinc-700 dark:text-zinc-300">
              Last Name
            </label>
            <input
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full rounded border px-2 py-1 bg-white text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input
              id="receive"
              type="checkbox"
              checked={form.receiveCampaignEmails}
              onChange={(e) =>
                setForm({ ...form, receiveCampaignEmails: e.target.checked })
              }
              className="h-4 w-4 rounded border-zinc-300 text-blue-600"
            />
            <label
              htmlFor="receive"
              className="text-sm text-zinc-700 dark:text-zinc-300"
            >
              Receive campaign emails
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded border px-3 py-1 bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-3 py-1 text-white"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
