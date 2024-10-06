import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
	const { isCheckingout, checkoutMutate } = useCheckout();

	return (
		<Button
			variation="primary"
			size="small"
			onClick={() => checkoutMutate(bookingId)}
			disabled={isCheckingout}
		>
			CheckOut
		</Button>
	);
}

export default CheckoutButton;
