import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUsr } from "../../services/apiAuth";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUsrMutate, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUsr,
		onSuccess: () => {
			toast.success("account updated");
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateUsrMutate };
}
