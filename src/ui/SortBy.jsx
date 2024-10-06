import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "";

	function handleOptionChanged(e) {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			type="white"
			selectValue={sortBy}
			onChange={handleOptionChanged}
		></Select>
	);
}

export default SortBy;
