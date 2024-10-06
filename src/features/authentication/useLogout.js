import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logoutCall } from "../../services/apiAuth";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logoutMutate, isLoading: isLogingout } = useMutation({
		mutationFn: logoutCall,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
	});

	return { logoutMutate, isLogingout };
}
