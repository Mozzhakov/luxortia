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

const videoExtensions = [".mp4", ".webm", ".mov"];
const posterExtensions = [".jpg", ".jpeg", ".webp", ".png"];

function createPublicUrl(key: string) {
  const encodedKey = key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${process.env.R2_PUBLIC_URL}/${encodedKey}`;
}

function getBaseName(key: string) {
  const fileName = key.split("/").pop() ?? "";

  return fileName.replace(/\.[^.]+$/, "");
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

    const objects = result.Contents ?? [];

    const posters = objects.filter((object) => {
      if (!object.Key) return false;

      const key = object.Key.toLowerCase();

      return posterExtensions.some((extension) => key.endsWith(extension));
    });

    const videos = objects
      .filter((object) => {
        if (!object.Key) return false;

        const key = object.Key.toLowerCase();

        return videoExtensions.some((extension) => key.endsWith(extension));
      })
      .sort((a, b) => (a.Key ?? "").localeCompare(b.Key ?? ""))
      .map((object) => {
        const videoKey = object.Key!;
        const baseName = getBaseName(videoKey);

        const matchingPoster = posters.find((poster) => {
          if (!poster.Key) return false;

          return getBaseName(poster.Key) === baseName;
        });

        return {
          key: videoKey,
          name: videoKey.split("/").pop()!,
          url: createPublicUrl(videoKey),
          poster: matchingPoster?.Key
            ? createPublicUrl(matchingPoster.Key)
            : null,
          size: object.Size ?? 0,
          lastModified: object.LastModified ?? null,
        };
      });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("R2 LIST ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load videos" },
      { status: 500 },
    );
  }
}
