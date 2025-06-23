import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row $type="horizontal">
        <Heading $as="h1">همه ی کابین ها</Heading>
        <p>فیلتر / ترتیب</p>
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((cur) => !cur)}>
          اضافه کردن کابین
        </Button>

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
