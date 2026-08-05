import { NextResponse } from "next/server";

interface SubmitBandBody {
  bandName: string;
  genre: string;
  bio: string;
  contact: string;
  instagram?: string;
  spotify?: string;
  consent: boolean;
}

export async function POST(request: Request) {
  const body: SubmitBandBody = await request.json();

  if (!body.bandName || !body.genre || !body.contact) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!body.consent) {
    return NextResponse.json(
      { error: "You must confirm you own the rights to your band photo/media and agree to the usage terms before submitting." },
      { status: 400 }
    );
  }

  const profile = {
    slug: body.bandName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    headline: `${body.bandName} — ${body.genre} from Traverse City`,
    tagline: `${body.bandName} brings ${body.genre.toLowerCase()} energy to the Traverse City scene.`,
    bio:
      body.bio ||
      `${body.bandName} is a ${body.genre.toLowerCase()} act based in the Traverse City area, ready to bring their sound to local stages.`,
    status: "pending_review",
  };

  return NextResponse.json({ success: true, profile });
}
