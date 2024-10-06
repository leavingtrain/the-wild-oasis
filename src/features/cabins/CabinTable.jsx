import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useQueryCabins } from "./useQueryCabins";

function CabinTable() {
	const { cabins, isLoading } = useQueryCabins();
	const [searchParams] = useSearchParams();

	// FILTER, 使初识的fuv是全部cabins
	const filterUrlValue = searchParams.get("discount") || "all";

	let filteredCabins;
	if (filterUrlValue === "all") filteredCabins = cabins;
	if (filterUrlValue === "no-discount")
		filteredCabins = cabins?.filter((c) => c.discount === 0);
	if (filterUrlValue === "with-discount")
		filteredCabins = cabins?.filter((c) => c.discount > 0);

	// SORT,
	const sortBy = searchParams.get("sortBy") || "created_at-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;

	const sortedCabins = filteredCabins?.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);
	console.log("aa", sortedCabins);

	if (isLoading) return <Spinner />;
	if (!cabins?.length) return <Empty resource="cabins" />;

	return (
		<Menus>
			<Table gridcols="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>cabin</div>
					<div>capacity</div>
					<div>price</div>
					<div>discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					items={filteredCabins}
					render={(cabin) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
