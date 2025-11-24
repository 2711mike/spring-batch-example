"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export default function CreateCampaignModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ subject: "", content: "" });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded bg-white p-6 dark:bg-zinc-900 dark:text-zinc-100">
        <h2 className="text-lg font-semibold mb-4">Create Campaign</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            try {
              const payload = { ...form };
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaigns`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                }
              );
              if (res.ok) {
                setForm({ subject: "", content: "" });
                onClose();
                onCreated?.();
              } else {
                const err = await res.json();
                alert(err?.message ?? "Failed to create campaign");
              }
            } catch (err) {
              console.error(err);
              alert("Failed to create campaign");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div className="mb-3">
            <label className="block text-sm text-zinc-700 dark:text-zinc-300">
              Subject
            </label>
            <input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded border px-2 py-1 bg-white text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm text-zinc-700 dark:text-zinc-300">
              Content
            </label>
            <textarea
              required
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded border px-2 py-1 bg-white text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            />
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
              className="rounded bg-indigo-600 px-3 py-1 text-white"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
