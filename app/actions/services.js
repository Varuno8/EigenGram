"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createService(formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const awsModelUrl = formData.get("awsModelUrl");
    const price = parseFloat(formData.get("price"));
    const imageUrl = formData.get("imageUrl") || undefined;

    await db.service.create({
      data: {
        name,
        description,
        awsModelUrl,
        price,
        imageUrl,
      },
    });

    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("Error creating service:", error);
    throw new Error("Failed to create service");
  }
}
