"use client";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  receiveCampaignEmails: boolean;
};

type Props = {
  data: {
    content: User[];
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  } | null;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function UsersTable({ data, loading, onPrev, onNext }: Props) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-zinc-600">
          {data ? (
            <>
              Showing{" "}
              <strong>{data.number * data.size + data.numberOfElements}</strong>{" "}
              of <strong>{data.totalElements}</strong>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex gap-2">
          {(() => {
            const prevDisabled = !data || data.number === 0;
            const nextDisabled =
              !data || data.number >= (data?.totalPages ?? 1) - 1;
            return (
              <>
                <button
                  className="rounded border px-3 py-1 disabled:opacity-50"
                  onClick={onPrev}
                  disabled={prevDisabled}
                  aria-disabled={prevDisabled}
                  title={
                    prevDisabled ? "Already on first page" : "Previous page"
                  }
                >
                  Prev
                </button>
                <button
                  className="rounded border px-3 py-1 disabled:opacity-50"
                  onClick={onNext}
                  disabled={nextDisabled}
                  aria-disabled={nextDisabled}
                  title={nextDisabled ? "Already on last page" : "Next page"}
                >
                  Next
                </button>
              </>
            );
          })()}
        </div>
      </div>

      {loading && <div>Loading...</div>}

      {!loading && data && (
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">First name</th>
                <th className="py-2 pr-4">Last name</th>
                <th className="py-2 pr-4">Campaign</th>
              </tr>
            </thead>
            <tbody>
              {data.content.map((u) => (
                <tr key={u.email} className="border-t">
                  <td className="py-2 pr-4">{u.email}</td>
                  <td className="py-2 pr-4">{u.firstName}</td>
                  <td className="py-2 pr-4">{u.lastName}</td>
                  <td className="py-2 pr-4">
                    {String(u.receiveCampaignEmails)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
