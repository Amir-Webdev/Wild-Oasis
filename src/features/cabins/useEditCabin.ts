import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as editCabinApi } from "../../services/apiCabins";
import type { CabinFormInputs } from "../../types/cabin/cabinForm";
import toast from "react-hot-toast";

type DataType = CabinFormInputs & { cabinId: number };

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: (data: DataType) => {
      const { cabinId, ...other } = data;
      return editCabinApi(other, cabinId);
    },
    onSuccess: (res) => {
      if (res.error || !res.data) {
        toast.error(res.error || "کابین ویرایش نشد");
      } else if (res.data) {
        toast.success("کابین با موفقیت ویرایش شد.");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      }
    },
  });

  return { editCabin, isEditing };
}
