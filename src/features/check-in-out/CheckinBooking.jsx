import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useSettings } from "../../features/settings/useSettings";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSingleBooking } from "../bookings/useSingleBooking";
import Spinner from "../../ui/Spinner";
// import CheckBox from "../../ui/CheckBox";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	// 不可以设置if_paid这个字段值，因为data还没来会是undefined
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const { booking = {}, isLoading } = useSingleBooking();
	const moveBack = useMoveBack();
	const { checkinMutate, isCheckingin } = useCheckin();
	const { isLoading: isLoadingSettings, settings = {} } = useSettings();

	useEffect(() => setConfirmPaid(booking?.if_paid ?? false), [booking]);

	const { breakfast_price: breakfastPrice } = settings;
	const {
		id: bookingId,
		guests,
		total_price: totalPrice,
		num_guests: numGuests,
		if_has_breakfast: hasBreakfast,
		num_nights: numNights,
	} = booking;

	const totalBreakfastPrice = breakfastPrice * numGuests * numNights;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkinMutate({
				bookingId,
				breakfastRelated: {
					total_price: totalPrice + totalBreakfastPrice,
					extra_price: totalBreakfastPrice,
					if_has_breakfast: true,
				},
			});
		} else checkinMutate({ bookingId });
	}

	if (isLoading || isLoadingSettings) return <Spinner />;
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((a) => !a);
							setConfirmPaid(false);
						}}
						id="breakfast"
					>
						add breakfast its mandatory{" "}
						{formatCurrency(totalBreakfastPrice)}
					</Checkbox>
				</Box>
			)}
			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() => setConfirmPaid((s) => !s)}
					id="confirm"
					disabled={confirmPaid || isCheckingin}
				>
					{guests.full_name} has paid{" "}
					{addBreakfast
						? formatCurrency(totalPrice + totalBreakfastPrice)
						: formatCurrency(totalPrice)}{" "}
					(
					{addBreakfast
						? `${formatCurrency(totalPrice)} +
						  ${formatCurrency(totalBreakfastPrice)}`
						: `${formatCurrency(totalPrice)} + $0.0`}
					)
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid || isCheckingin}
				>
					Check in booking #{bookingId}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
