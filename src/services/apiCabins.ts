import supabase from "./supabase";
import { CabinSchema, type CabinType } from "../types/cabin";

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
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
