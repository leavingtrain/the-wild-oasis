import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
	// 为了invalidate cache
	const queryClient = useQueryClient();
	// 返回之中mutate用在handler为了给mutationFn传递formData，
	// 参数obj之中，muFn来调用asyncFunc，onSucess来toast、invalidate、reset
	const { mutate: editMutate, isLoading: isEditing } = useMutation({
		mutationFn: (partialData) => updateSetting(partialData),
		onSucess: () => {
			// toast.success("edited");
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { editMutate, isEditing };
}
