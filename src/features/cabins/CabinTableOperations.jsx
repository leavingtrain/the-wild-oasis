import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				urlParamsKey="discount"
				urlParamsValues={[
					{ value: "all", label: "All" },
					{ value: "no-discount", label: "No discount" },
					{ value: "with-discount", label: "With discount" },
				]}
			/>

			<SortBy
				options={[
					{
						value: "cabin_name-asc",
						label: "Sort by ascending alphabet",
					},
					{
						value: "cabin_name-desc",
						label: "Sort by descending alphabet",
					},
					{ value: "regular_price-asc", label: "Sort by asc price" },
					{
						value: "regular_price-desc",
						label: "Sort by desc price",
					},
					{
						value: "max_capacity-asc",
						label: "Sort by capacity (low first)",
					},
					{
						value: "max_capacity-desc",
						label: "Sort by capacity (high first)",
					},
				]}
			/>
		</TableOperations>
	);
}

export default CabinTableOperations;
