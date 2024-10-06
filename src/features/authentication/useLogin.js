import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { loginCall } from "../../services/apiAuth";

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: loginMutate, isLoading: isLogining } = useMutation({
		mutationFn: (credential) => loginCall(credential),
		onSuccess: (credentialData) => {
			queryClient.setQueryData(["currentUser"], credentialData);
			// queryClient.setQueriesData(["currentUser"], credentialData);
			navigate("/dashboard", { replace: true });
		},
		onError: (error) => {
			console.log("er", error);

			toast.error(
				"Invalid login credentials. \n psw or email was incorrect"
			);
		},
	});

	return { loginMutate, isLogining };
}
