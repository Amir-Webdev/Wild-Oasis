import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal((cur) => !cur)}>
        اضافه کردن کابین
      </Button>

      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <CreateCabinForm onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
