import AddCabin from "../features/cabins/AddCabin";

import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
	return (
		// 为了直接成为Outlet的第一代children, 只能使用fragment不能<div>
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<CabinTableOperations />
			</Row>
			<Row>
				<CabinTable />

				<AddCabin />
			</Row>
		</>
	);
}

export default Cabins;
