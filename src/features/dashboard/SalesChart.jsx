import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
	AreaChart,
	Area,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";

import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";

// coluns goes from begin to end
const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

function SalesChart({ bookings, numDays }) {
	const { isDarkMode } = useDarkMode();
	// every single date
	const datesArr = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});
	const salesData = datesArr.map((date) => {
		return {
			label: format(date, "MMM dd"),
			totalSales: bookings
				.filter((booking) =>
					isSameDay(date, new Date(booking.created_at))
				)
				.reduce((acc, cur) => acc + cur.total_price, 0),
			extrasSales: bookings
				.filter((booking) =>
					isSameDay(date, new Date(booking.created_at))
				)
				.reduce((acc, cur) => acc + cur.extra_price, 0),
		};
	});

	const colors = isDarkMode
		? {
				totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
				extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
				extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };

	return (
		<StyledSalesChart>
			<Heading as="h2">
				sales from {format(datesArr.at(0), "MMM dd yyyy")} &mdash;{" "}
				{format(datesArr.at(-1), "MMM dd yyyy")}
			</Heading>

			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={salesData}>
					<XAxis
						dataKey="label"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<YAxis
						unit="$"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<CartesianGrid strokeDasharray="4" />
					<Tooltip
						contentStyle={{ backgroundColor: colors.background }}
					/>
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						name="Total Sales"
						uint="$"
					/>
					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extras Sales"
						uint="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

export default SalesChart;
