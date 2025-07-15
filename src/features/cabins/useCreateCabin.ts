import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: (res) => {
      if (res.error || !res.data) {
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
