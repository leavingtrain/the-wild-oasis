import styled from "styled-components";
import { Outlet } from "react-router";

import Header from "./Header";
import Sidebar from "./Sidebar";

// display: grid,, create single column inline grid
// grid-template-columns: 2rem 1fr,, define两个column tracks in 每个行向. with 2rem and the other column track with flexible.. 每行两列，行1第一列第一个ele，第二列第二个ele，行2.。
// grid-template-rows: auto 1fr,,
// grid-row: 1/-1;,, 列向互换，使第二列成为第一列，并且span from first to last row, 并且定义的列向第一列宽度auto变为第二列宽度auto
const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow: scroll;
`;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
