import supabase, { supabaseUrl } from "./supabase";
import { CabinSchema, type CabinType } from "../types/cabin/cabinFromServer";
import type { CabinFormInputs } from "../types/cabin/cabinForm";
import { ZodError } from "zod/v4";
import { errorLogger } from "../utils/errorLogger";

type CreateEditCabinResults = {
  data: CabinType | null;
  error: string | null;
};

export async function createCabin(
  newCabin: CabinFormInputs
): Promise<CreateEditCabinResults> {
  if (!newCabin.image || newCabin.image.length === 0) {
    return { data: null, error: "عکسی یافت نشد." };
  }

  // Replace all slashes with empty string. Supabase makes new folders coresponding to slashes
  let imageName;
  if (typeof newCabin.image !== "string") {
    imageName = `${Date.now()}.${newCabin.image[0].type!.split("/")[1]}`;
  }
  const imagePath =
    typeof newCabin.image === "string"
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  try {
    const { data: cabinData, error: cabinError } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

    if (cabinError || !cabinData) {
      if (cabinError) errorLogger(cabinError);
      return { data: null, error: "کابین ایجاد نشد." };
    }

    if (typeof newCabin.image !== "string") {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName!, newCabin.image[0]);

      if (storageError) {
        await supabase.from("cabins").delete().eq("id", cabinData.id);
        return { data: null, error: "عکس ارسال نشد." };
      }
    }

    try {
      const parsedData = CabinSchema.parse(cabinData);
      return { data: parsedData, error: null };
    } catch (zodError: unknown) {
      errorLogger(zodError);
      if (zodError instanceof ZodError) {
        return { data: null, error: "خطای اعتبارسنجی داده دریافتی" };
      }
      return { data: null, error: "خطای اعتبار سنجی ناشناخته." };
    }
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

export async function editCabin(
  editedCabin: CabinFormInputs,
  cabinId: number
): Promise<CreateEditCabinResults> {
  let imageName: string | undefined;
  let imagePath: string | undefined;

  const providedImg = editedCabin.image && editedCabin.image.length > 0;

  if (providedImg && typeof editedCabin.image !== "string") {
    imageName = `${Date.now()}.${editedCabin.image[0].type.split("/")[1]}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  }

  try {
    const query = supabase.from("cabins");

    const newEditedCabin = {
      name: editedCabin.name,
      maxCapacity: editedCabin.maxCapacity,
      regularPrice: editedCabin.regularPrice,
      discount: editedCabin.discount,
      description: editedCabin.description,
    };

    if (providedImg) {
      await query
        .update({
          ...newEditedCabin,
          image: imagePath,
        })
        .eq("id", cabinId);
    } else {
      await query.update(newEditedCabin).eq("id", cabinId);
    }

    const { data: cabinData, error: cabinError } = await query
      .select()
      .single();

    if (cabinError || !cabinData) {
      if (cabinError) errorLogger(cabinError);
      return { data: null, error: "کابین ویرایش نشد." };
    }

    const uploadNewImage = async () => {
      if (imageName) {
        const { error: storageError } = await supabase.storage
          .from("cabin-images")
          .upload(imageName, editedCabin.image[0]);

        if (storageError) {
          await supabase.from("cabins").delete().eq("id", cabinData.id);
          return { data: null, error: "عکس ارسال نشد." };
        }
      }
    };
    if (providedImg) await uploadNewImage();

    try {
      const parsedData = CabinSchema.parse(cabinData);
      return { data: parsedData, error: null };
    } catch (zodError: unknown) {
      errorLogger(zodError);
      if (zodError instanceof ZodError) {
        return { data: null, error: "خطای اعتبارسنجی داده دریافتی" };
      }
      return { data: null, error: "خطای اعتبار سنجی ناشناخته." };
    }
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error || !data) {
    throw new Error("کابین ها بارگیری نشدند");
  }

  return CabinSchema.array().parse(data);
}

export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("کابین حذف نشد");
  }
}
