import { ZodError } from "zod";
import {
  settingsFromServerSchema,
  type BaseSettings,
  type SettingsFromServer,
} from "../types/settings/SettingsType";
import { errorLogger } from "../utils/errorLogger";
import supabase from "./supabase";

export async function getSettings(): Promise<SettingsFromServer> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    errorLogger(error);
    throw new Error("تنظیمات بارگیری نشدند");
  }

  try {
    return settingsFromServerSchema.parse(data);
  } catch (error) {
    errorLogger(error);
    if (error instanceof ZodError) {
      throw new Error("خطای اعتبارسنجی داده دریافتی");
    } else {
      throw new Error("خطای اعتبارسنجی ناشناخته");
    }
  }
}

export async function updateSetting(newSetting: BaseSettings): Promise<void> {
  const { error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("تنظیمات بروزرسانی نشد. مجددا تلاش کنید.");
  }
}
