import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useSingleBooking } from "./useSingleBooking.js";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const navigate = useNavigate();
	const { isLoading, booking = {} } = useSingleBooking();
	const { status, id: bookingId } = booking;
	console.log("bookingid", bookingId);
	const { isCheckingout, checkoutMutate } = useCheckout();
	const { isDeleting, deleteMutate } = useDeleteBooking();

	const moveBack = useMoveBack();

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	if (isLoading) return <Spinner />;
	if (!bookingId) return <Empty resource="booking" />;
	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace("-", " ")}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
						check in
					</Button>
				)}
				{status === "checked-in" && (
					<Button
						onClick={() => checkoutMutate(bookingId)}
						disabled={isCheckingout}
					>
						go out
					</Button>
				)}
				<Modal>
					<Modal.Open opens="deleteConfirm">
						<Button variation="danger">delete</Button>
					</Modal.Open>
					<Modal.Window name="deleteConfirm">
						<ConfirmDelete
							resourceName="booking"
							disabled={isDeleting}
							onConfirm={() =>
								deleteMutate(bookingId, {
									onSettled: navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>

				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
