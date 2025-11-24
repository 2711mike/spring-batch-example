import { NextResponse } from "next/server";
import { BACKEND_URL } from "../../lib/backend";

function numberToWords(n: number): string {
  if (n === 0) return "Zero";
  const ones: string[] = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens: string[] = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  let words = "";
  if (n >= 1000) {
    const th = Math.floor(n / 1000);
    words += numberToWords(th) + "Thousand";
    n = n % 1000;
  }
  if (n >= 100) {
    const h = Math.floor(n / 100);
    words += ones[h] + "Hundred";
    n = n % 100;
  }
  if (n >= 20) {
    const t = Math.floor(n / 10);
    words += tens[t];
    const o = n % 10;
    if (o) words += ones[o];
  } else if (n > 0) {
    words += ones[n];
  }
  return words;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page") ?? "0";
  const page = Math.max(0, parseInt(pageParam, 10) || 0);
  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/users?page=${page}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const text = await backendRes.text();
    let parsed: any = text;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch (e) {}

    return NextResponse.json(parsed, { status: backendRes.status });
  } catch (err) {
    console.error(
      "GET /api/users forwarding failed, falling back to demo data:",
      err
    );
  }

  const pageSize = 100;
  const totalElements = 1020;
  const totalPages = Math.ceil(totalElements / pageSize);

  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalElements);

  const content = [] as Array<Record<string, any>>;
  for (let i = start; i <= end; i++) {
    const idx = String(i).padStart(3, "0");
    content.push({
      email: `user${idx}@example.com`,
      firstName: "User",
      lastName: numberToWords(i),
      receiveCampaignEmails: false,
    });
  }

  const response = {
    content,
    pageable: {
      pageNumber: page,
      pageSize: pageSize,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: page * pageSize,
      paged: true,
      unpaged: false,
    },
    last: page >= totalPages - 1,
    totalElements,
    totalPages,
    numberOfElements: content.length,
    size: pageSize,
    number: page,
    sort: { empty: true, sorted: false, unsorted: true },
    first: page === 0,
    empty: content.length === 0,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "").trim();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const receiveCampaignEmails = Boolean(body.receiveCampaignEmails ?? false);

    if (!email) {
      return NextResponse.json(
        { message: "email is required" },
        { status: 400 }
      );
    }

    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          receiveCampaignEmails,
        }),
      });

      const json = await backendRes.text();
      let parsed: any = json;
      try {
        parsed = json ? JSON.parse(json) : null;
      } catch (e) {}

      return NextResponse.json(parsed, { status: backendRes.status });
    } catch (e) {
      console.error("Error forwarding to backend:", e);
      return NextResponse.json(
        { message: "failed to forward to backend" },
        { status: 502 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: "invalid json" }, { status: 400 });
  }
}
