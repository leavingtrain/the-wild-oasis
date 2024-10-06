import { GiNinjaHeroicStance } from "react-icons/gi";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

function Logout() {
	const { logoutMutate, isLogingout } = useLogout();

	return (
		<ButtonIcon ht="logout" onClick={logoutMutate} disabled={isLogingout}>
			{isLogingout ? <SpinnerMini /> : <GiNinjaHeroicStance />}
		</ButtonIcon>
	);
}

export default Logout;
