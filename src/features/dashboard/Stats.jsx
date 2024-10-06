import {
	// GiYinYang,
	GiStarSwirl,
	GiCloudyFork,
	GiDwarfFace,
	GiKatana,
} from "react-icons/gi";
import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	// numBookings
	const numBookings = bookings.length;

	const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);

	const checkins = confirmedStays.length;

	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.num_nights, 0) /
		(numDays * cabinCount);

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<GiStarSwirl />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="indigo"
				icon={<GiDwarfFace />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="green"
				icon={<GiKatana />}
				value={checkins}
			/>
			<Stat
				title="occupancy rate"
				color="yellow"
				icon={<GiCloudyFork />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
}

export default Stats;
