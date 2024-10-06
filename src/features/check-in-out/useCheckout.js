import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router";

export function useCheckout() {
	const queryClient = useQueryClient();
	// const navigate = useNavigate();

	const { mutate: checkoutMutate, isLoading: isCheckingout } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-out",
			}),
		// 页面不动，只是清理缓存，让自己操作才最好
		onSuccess: (data) => {
			toast.success(`booking ${data.id} checked out`);
			queryClient.invalidateQueries({ active: true });
			// navigate(-1);
		},
		onError: () => toast.error("Im an error"),
	});

	return { checkoutMutate, isCheckingout };
}
