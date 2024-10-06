import {
	// GiNinjaArmor,
	// GiNinjaHeroicStance,
	// GiRunningNinja,
	GiSamuraiHelmet,
} from "react-icons/gi";

import { useNavigate } from "react-router";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`;

function HeaderMenu() {
	const navigate = useNavigate();

	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon ht="acc" onClick={() => navigate("/account")}>
					<GiSamuraiHelmet />
				</ButtonIcon>
			</li>
			<li>
				<DarkModeToggle />
			</li>
			<li>
				<Logout />
			</li>
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;
