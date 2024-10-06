import { useQuery } from "@tanstack/react-query";
import { getCurUsr } from "../../services/apiAuth";

export function useCacheUser() {
	const { isLoading, data: currentUser } = useQuery({
		queryKey: ["currentUser"],
		queryFn: getCurUsr,
	});
	return {
		isLoading,
		currentUser,
		isAuthenticated: currentUser?.role === "authenticated",
	};
}
