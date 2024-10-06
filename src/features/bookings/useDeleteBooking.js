import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	// const navigate = useNavigate();

	const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
		mutationFn: (bookingId) => deleteBooking(bookingId),
		onSuccess: (data) => {
			toast.success(`booking deleted`);
			queryClient.invalidateQueries({ avtive: true });
			// navigate("/bookings");
		},
	});

	return { deleteMutate, isDeleting };
}
