import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: delMutate } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success("successfully");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, delMutate };
}
