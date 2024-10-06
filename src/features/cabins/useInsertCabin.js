import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { insertCabin } from "../../services/apiCabins";

export function useInsertCabin() {
	const queryClient = useQueryClient();
	const { mutate: insMutate, isLoading: isInserting } = useMutation({
		mutationFn: (newCabin) => insertCabin(newCabin),
		onSuccess: () => {
			toast.success("new cabin inserted");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isInserting, insMutate };
}
