import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import type { BaseSettings } from "../../types/settings/SettingsType";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useUpdateSettings } from "./useUpdateSettings";
import { useEffect } from "react";

function UpdateSettingsForm() {
  const { data, isPending } = useSettings();
  const { updateSettings, isPending: isUpdating } = useUpdateSettings();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<BaseSettings>();

  useEffect(() => {
    reset({
      minBookingsLength: data?.minBookingsLength,
      maxBookingsLength: data?.maxBookingsLength,
      maxGuestsPerBooking: data?.maxGuestsPerBooking,
      breakfastPrice: data?.breakfastPrice,
    });
  }, [reset, data]);

  function onSubmit(newSettings: BaseSettings) {
    updateSettings(newSettings);
  }

  if (isPending) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="حداقل شب برای رزرو"
        error={errors?.minBookingsLength?.message}
      >
        <Input
          type="number"
          id="minBookingsLength"
          {...register("minBookingsLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow
        label="حداکثر شب برای رزرو"
        error={errors?.maxBookingsLength?.message}
      >
        <Input
          type="number"
          id="maxBookingsLength"
          {...register("maxBookingsLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow
        label="حداکثر تعداد مهمان برای هر اتاق"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          {...register("maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="قیمت صبحانه" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfastPrice"
          {...register("breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>بروزرسانی</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
