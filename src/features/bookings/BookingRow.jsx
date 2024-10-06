import styled from "styled-components";
import { format, isToday } from "date-fns";
import { FaCannabis } from "react-icons/fa";
import {
	GiNinjaHeroicStance,
	GiRunningNinja,
	GiHummingbird,
} from "react-icons/gi";
import {} from "react-icons/gi";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

function BookingRow({
	booking: {
		id: bookingId,
		created_at,
		start_date: startDate,
		end_date: endDate,
		num_nights: numNights,
		num_guests: numGuests,
		total_price: totalPrice,
		status,
		guests: { full_name: guestName, email },
		cabins: { cabin_name: cabinName },
	},
}) {
	const navigate = useNavigate();
	const { isCheckingout, checkoutMutate } = useCheckout();
	const { isDeleting, deleteMutate } = useDeleteBooking();

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}{" "}
					&rarr; {numNights} night stay
				</span>
				<span>
					{format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(endDate), "MMM dd yyyy")}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={bookingId}></Menus.Toggle>
					<Menus.List id={bookingId}>
						<Menus.Button
							icon={<FaCannabis />}
							onClick={() => navigate(`${bookingId}`)}
						>
							see shit
						</Menus.Button>
						{status === "unconfirmed" && (
							<Menus.Button
								icon={<GiNinjaHeroicStance />}
								onClick={() =>
									navigate(`/checkin/${bookingId}`)
								}
							>
								check in
							</Menus.Button>
						)}
						{status === "checked-in" && (
							<Menus.Button
								icon={<GiRunningNinja />}
								onClick={() => checkoutMutate(bookingId)}
								disabled={isCheckingout}
							>
								go out
							</Menus.Button>
						)}
						<Modal.Open opens="deleteConfirm">
							<Menus.Button icon={<GiHummingbird />}>
								delete
							</Menus.Button>
						</Modal.Open>
					</Menus.List>
					<Modal.Window name="deleteConfirm">
						<ConfirmDelete
							resourceName="booking"
							disabled={isDeleting}
							onConfirm={() => deleteMutate(bookingId)}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
}

export default BookingRow;
