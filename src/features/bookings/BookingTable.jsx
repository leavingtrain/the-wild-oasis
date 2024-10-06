import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
	const { isLoading, bookings, bookingsCount } = useBookings();

	// 这里的逻辑是state data的状态随着query不断返回的数据在变 导致本compo重复在re-render
	if (isLoading) return <Spinner />;
	if (!bookings?.length) return <Empty resource="bookings" />;
	return (
		<Menus>
			<Table gridcols="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					items={bookings}
					render={(booking) => (
						<BookingRow key={booking.id} booking={booking} />
					)}
				/>

				<Table.Footer>
					<Pagination count={bookingsCount} />
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default BookingTable;
