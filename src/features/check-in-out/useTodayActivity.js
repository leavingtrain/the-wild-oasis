import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
	const { isLoading, data: bookingToday } = useQuery({
		queryFn: getStaysTodayActivity,
		queryKey: ["today-activity"],
	});

	return { isLoading, bookingToday };
}
