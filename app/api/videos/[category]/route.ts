import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

import { NextResponse } from "next/server";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const allowedCategories = ["food", "beauty", "events", "people", "automotive"];

function createPublicUrl(key: string) {
  const encodedKey = key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${process.env.R2_PUBLIC_URL}/${encodedKey}`;
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ category: string }>;
  },
) {
  try {
    const { category } = await params;

    if (!allowedCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const prefix = `portfolio/${category}/`;

    const result = await r2.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME,
        Prefix: prefix,
      }),
    );

    const videos =
      result.Contents?.filter((object) => {
        if (!object.Key) return false;

        const key = object.Key.toLowerCase();

        return (
          key.endsWith(".mp4") || key.endsWith(".webm") || key.endsWith(".mov")
        );
      })
        .sort((a, b) => (a.Key ?? "").localeCompare(b.Key ?? ""))
        .map((object) => ({
          key: object.Key!,
          name: object.Key!.split("/").pop()!,
          url: createPublicUrl(object.Key!),
          size: object.Size ?? 0,
          lastModified: object.LastModified ?? null,
        })) ?? [];

    return NextResponse.json(videos);
  } catch (error) {
    console.error("R2 LIST ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load videos" },
      { status: 500 },
    );
  }
}
