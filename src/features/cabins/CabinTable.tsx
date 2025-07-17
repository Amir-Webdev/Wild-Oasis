import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";

function CabinTable() {
  const { cabins, isPending, error } = useCabins();

  if (isPending && !cabins) return <Spinner />;

  if (error) return <div>error</div>;

  if (cabins)
    return (
      <>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>اسم کابین</div>
            <div>ظرفیت</div>
            <div>قیمت</div>
            <div>تخفیف</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={cabins}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Table>
      </>
    );
}

export default CabinTable;
