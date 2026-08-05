import { NextResponse } from "next/server";

interface SubmitPhotosBody {
  name: string;
  email: string;
  eventOrVenue?: string;
  message?: string;
  consent: boolean;
}

export async function POST(request: Request) {
  const body: SubmitPhotosBody = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!body.consent) {
    return NextResponse.json(
      { error: "You must confirm you own these photos and agree to the usage terms before submitting." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Thanks! Your photos have been queued for review by the Traverse City Vibe team.",
  });
}
