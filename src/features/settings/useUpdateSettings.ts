import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { errorLogger } from "../../utils/errorLogger";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSettings,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateSetting,
    mutationKey: ["Settings"],
    onSuccess: () => {
      toast.success("تنظیمات با موفقیت بروزرسانی شدند");
      queryClient.invalidateQueries({ queryKey: ["Settings"] });
    },
    onError: (error) => {
      errorLogger(error);
      toast.error("بروزرسانی تنظیمات با شکست مواجه شد. مجددا تلاش کنید.");
    },
  });

  return { updateSettings, isPending, error };
}
