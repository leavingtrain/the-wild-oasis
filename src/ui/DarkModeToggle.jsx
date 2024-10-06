import { GiSunPriest, GiWolfHead } from "react-icons/gi";
import { useDarkMode } from "../context/DarkModeContext";

import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<ButtonIcon
			ht={`${!isDarkMode ? "darkmode" : "lightmode"}`}
			onClick={toggleDarkMode}
		>
			{!isDarkMode ? <GiWolfHead /> : <GiSunPriest />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;
