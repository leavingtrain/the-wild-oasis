import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/magicalVariable";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// FILTER
	const filterUrlValue = searchParams.get("status");

	const filter =
		!filterUrlValue || filterUrlValue === "all"
			? null
			: { field: "status", value: filterUrlValue, method: "eq" };

	// SORT, 经典split + modifier
	const sortUrlValue = searchParams.get("sortBy") || "start_date-desc";
	const [field, direction] = sortUrlValue.split("-");
	const sortBy = { field, direction };

	// PAGINATION
	const page = !searchParams.get("page")
		? 1
		: Number(searchParams.get("page"));

	const {
		isLoading,
		error,
		data = {},
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});
	// 注意query 常见的data undefined报错，不可以直接destructure 先赋值为{}
	const { data: bookings, count: bookingsCount } = data;

	// PRE-FETCHING
	const pageCount = Math.ceil(bookingsCount / PAGE_SIZE);
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, error, bookings, bookingsCount };
}
