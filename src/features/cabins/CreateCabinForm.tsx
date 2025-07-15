import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";

import { createCabin, editCabin } from "../../services/apiCabins";
import type { CabinFormInputs } from "../../types/cabin/cabinForm";
import FormRow from "../../ui/FormRow";
import type { CabinType } from "../../types/cabin/cabinFromServer";

type CreateCabinFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  editingCabinInfo: CabinType | null;
};

function CreateCabinForm({
  setShowForm,
  editingCabinInfo = null,
}: CreateCabinFormProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState } = useForm<CabinFormInputs>(
    {
      defaultValues: editingCabinInfo
        ? {
            name: editingCabinInfo.name,
            maxCapacity: editingCabinInfo.maxCapacity,
            regularPrice: editingCabinInfo.regularPrice,
            discount: editingCabinInfo.discount,
            description: editingCabinInfo.description,
            image: undefined,
          }
        : {},
    }
  );
  const { errors } = formState;

  const { mutate, isPending: isWorking } = useMutation({
    mutationFn: editingCabinInfo
      ? (data: CabinFormInputs) => editCabin(data, editingCabinInfo.id)
      : createCabin,
    onSuccess: (res) => {
      if (res.error || !res.data) {
        toast.error(res.error || "کابین ایجاد نشد");
      } else if (res.data) {
        toast.success(
          editingCabinInfo
            ? "کابین با موفقیت ویرایش شد."
            : "کابین با موفقیت ایجاد شد."
        );
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
        reset();
      }
    },
  });

  function onSubmit(newCabin: CabinFormInputs): void {
    mutate(newCabin);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow id="name" label="نام کابین" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "پر کردن این فیلد اجباری است.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        id="maxCapacity"
        label="حداکثر ظرفیت"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "پر کردن این فیلد اجباری است.",
            min: {
              value: 1,
              message: "ظرفیت حداقل باید 1 باشد",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        id="regularPrice"
        label="قیمت عادی"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "پر کردن این فیلد اجباری است.",
            min: {
              value: 1,
              message: "قیمت حداقل باید 1 باشد",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow id="discount" label="تخفیف" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "پر کردن این فیلد اجباری است.",
            validate: (value, formValues) =>
              value <= formValues.regularPrice ||
              "مبلغ تخفیف داده شده نمیتواند از قیمت بیشتر باشد.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        id="description"
        label="توضیحات برای وب‌سایت"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "پر کردن این فیلد اجباری است.",
          })}
          disabled={isWorking}
        />{" "}
      </FormRow>

      <FormRow id="image" label="عکس کابین" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editingCabinInfo ? false : "پر کردن این فیلد اجباری است.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => setShowForm((cur) => !cur)}
          disabled={isWorking}
        >
          انصراف
        </Button>
        <Button>{editingCabinInfo ? "ویرایش" : "افزودن"} کابین</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
