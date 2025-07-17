import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  return (
    <>
      <Row $type="horizontal">
        <Heading $as="h1">همه ی کابین ها</Heading>
        <p>فیلتر / ترتیب</p>
      </Row>
      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
