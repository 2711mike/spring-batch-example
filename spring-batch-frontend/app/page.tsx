"use client";

import { useEffect, useState } from "react";
import UsersTable from "./components/UsersTable";
import CreateUserModal from "./components/CreateUserModal";
import CreateCampaignModal from "./components/CreateCampaignModal";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  receiveCampaignEmails: boolean;
};

type PageResponse = {
  content: User[];
  pageable: { pageNumber: number; pageSize: number; offset: number };
  last: boolean;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  number: number;
  first: boolean;
  empty: boolean;
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<PageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  useEffect(() => {
    let mounted = true;
    const t = setTimeout(() => setLoading(true), 0);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?page=${page}`)
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setData(json as PageResponse);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [page]);

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <main className="mx-auto max-w-5xl bg-white p-6 shadow-sm dark:bg-black">
        <h1 className="text-4xl md:text-4xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-50">
          Spring Batch Example
        </h1>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
            >
              Create User
            </button>
            <button
              onClick={() => setShowCampaignModal(true)}
              className="rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700"
            >
              Create Campaign
            </button>
          </div>
        </div>

        {loading && <div>Loading...</div>}

        <CreateUserModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onCreated={() => setPage(0)}
        />
        <CreateCampaignModal
          open={showCampaignModal}
          onClose={() => setShowCampaignModal(false)}
        />

        <UsersTable
          data={data}
          loading={loading}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() =>
            setPage((p) => (data && p < data.totalPages - 1 ? p + 1 : p))
          }
        />
      </main>
    </div>
  );
}
