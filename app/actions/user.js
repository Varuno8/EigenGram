"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveUserData(userData) {
  try {
    const { externalId, phoneNumber, name, email } = userData;

    const existingUser = await db.user.findUnique({
      where: { externalId },
    });

    if (existingUser) {
      // Update existing user
      await db.user.update({
        where: { externalId },
        data: { phoneNumber, name, email },
      });
    } else {
      // Create new user
      await db.user.create({
        data: { externalId, phoneNumber, name, email },
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error saving user data:", error);
    return { success: false, error: "Failed to save user data" };
  }
}

export async function updateUserAccount(userId, data) {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
    });
    revalidatePath("/dashboard/account");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user account:", error);
    return { success: false, error: "Failed to update user account" };
  }
}

export async function createFeatureRequest(userId, data) {
  try {
    await db.featureRequest.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
      },
    });
    revalidatePath("/admin/feature-requests");
    return { success: true };
  } catch (error) {
    console.error("Failed to create feature request:", error);
    return { success: false, error: "Failed to create feature request" };
  }
}
