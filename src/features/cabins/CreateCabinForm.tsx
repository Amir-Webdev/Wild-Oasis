import styled from "styled-components";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm() {
  return (
    <Form>
      <FormRow>
        <Label htmlFor="name">نام کابین</Label>
        <Input type="text" id="name" />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">حداکثر ظرفیت</Label>
        <Input type="number" id="maxCapacity" />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">قیمت عادی</Label>
        <Input type="number" id="regularPrice" />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">تخفیف</Label>
        <Input type="number" id="discount" defaultValue={0} />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">توضیحات برای وب‌سایت</Label>
        <Textarea id="description" defaultValue="" />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">عکس کابین</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          انصراف
        </Button>
        <Button>ویرایش کابین</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
