import styled from "styled-components";
import type { CabinType } from "../../types/cabin";
import { toPersianDigits, toPersianPrice } from "../../utils/toPersianNumbers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  justify-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
`;

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

const Button = styled.button`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.6rem 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.4rem;
  background-color: var(--color-white);
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

type CabinRowProps = {
  cabin: CabinType;
};

function CabinRow(props: CabinRowProps) {
  const {
    id: cabinId,
    image,
    name: cabinName,
    maxCapacity: capacity,
    regularPrice: price,
    discount,
  } = props.cabin;

  const queryClient = useQueryClient();

  const { mutate, isPending: isDeleting } = useMutation<void, Error, number>({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("کابین با موفقیت حذف شد.");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow role="row" aria-disabled={isDeleting}>
      <Img src={image} />
      <Cabin>{cabinName}</Cabin>
      <div>{toPersianDigits(capacity)} نفر</div>
      <Price>{toPersianPrice(price)} تومان</Price>
      <Discount>{toPersianDigits(discount)}</Discount>
      <Button onClick={() => mutate(cabinId)} disabled={isDeleting}>
        حذف
      </Button>
    </TableRow>
  );
}

export default CabinRow;
