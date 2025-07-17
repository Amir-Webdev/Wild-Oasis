import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { errorLogger } from "../../utils/errorLogger";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: createCabin,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: (res) => {
      if (res.error || !res.data) {
        errorLogger(error);
        toast.error(res.error || "کابین ایجاد نشد");
      } else if (res.data) {
        toast.success("کابین با موفقیت ایجاد شد.");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      }
    },
  });

  return { createCabin, isCreating };
}
