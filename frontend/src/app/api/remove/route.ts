import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const formData = await request.formData();
  const res = await fetch('http://localhost:3001/remove', { method: 'POST', body: formData });
  return NextResponse.json(await res.json());
}
