import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { status: 'Ben buradayım, uyumuyorum! 🤖', timestamp: new Date().toISOString() },
    { status: 200 }
  )
}
