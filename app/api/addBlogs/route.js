import connectToDatabase from "@/lib/db";
import { Buffer } from "buffer";
import DatauriParser from "datauri/parser";
import cloudinary from "cloudinary";
import BlogPost from "@/model/BlogModel";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function POST(request) {
  await connectToDatabase();
  const parser = new DatauriParser();
  const formData = await request.formData();

  const maintitle = formData.get("maintitle");
  const maincontent = formData.get("maincontent");
  const author = formData.get("author");
  const tags = formData.get("tags") ? formData.get("tags").split(",") : [];
  const datePublished = formData.get("datePublished");

  const image1 = formData.get("image1");
  const image2 = formData.get("image2");
  const image3 = formData.get("image3");
  const image4 = formData.get("image4");
  const imageFiles = [image1, image2, image3, image4].filter(Boolean);

  const sections = [];

 formData.forEach((value, key) => {
  const sectionMatch = key.match(/^sections\[(\d+)]\[(title|content)](\[\d+\])?$/);
  if (sectionMatch) {
    const index = parseInt(sectionMatch[1]);
    const field = sectionMatch[2];
    const contentIndex = sectionMatch[3] ? parseInt(sectionMatch[3].match(/\[(\d+)\]/)[1]) : 0;

    sections[index] = sections[index] || { title: "", content: [] };
    if (field === "content") {
      sections[index][field][contentIndex] = value;
    } else {
      sections[index][field] = value;
    }
  }
  });


  try {
    const uploadPromises = imageFiles.map(async (imageFile) => {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const file64 = parser.format(imageFile.name, buffer);
      const result = await cloudinary.uploader.upload(file64.content, {
        resource_type: "auto",
      });
      return result.secure_url;
    });

    const cloudinaryUrls = await Promise.all(uploadPromises);

    const newBlog = await BlogPost.create({
      maintitle,
      maincontent,
      author,
      sections,
      tags,
      datePublished,
      images: cloudinaryUrls || [],
    });

    return Response.json({
      status: "success",
      data: newBlog,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ status: "fail" });
  }
}
