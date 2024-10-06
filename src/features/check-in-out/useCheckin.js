import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkinMutate, isLoading: isCheckingin } = useMutation({
		mutationFn: ({ bookingId, breakfastRelated = {} }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				if_paid: true,
				...breakfastRelated,
			}),
		onSuccess: (data) => {
			toast.success(`booking ${data.id} checked in`);
			queryClient.invalidateQueries({ active: true });
			navigate(-1, { replace: true });
		},
		onError: () => toast.error("Im an error"),
	});

	return { checkinMutate, isCheckingin };
}
