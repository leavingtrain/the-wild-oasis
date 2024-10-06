import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useDetectClickOutside } from "../hooks/useDetectClickOutside";

const Menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.position.x}px;
	top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

const MenusContext = createContext();

function Menus({ children }) {
	const [openId, setOpenId] = useState("");
	const close = () => setOpenId("");
	const open = setOpenId;
	const [listPosition, setListPosition] = useState(null);

	return (
		<MenusContext.Provider
			value={{ openId, open, close, listPosition, setListPosition }}
		>
			{children}
		</MenusContext.Provider>
	);
}

// function Menu({ children }) {
// 	return <StyledMenu>{children}</StyledMenu>;
// }

function Toggle({ id }) {
	const { openId, open, close, setListPosition } = useContext(MenusContext);

	function handleToggle(e) {
		e.stopPropagation();
		console.log("click to open");

		const rect = e.target.closest("button").getBoundingClientRect();
		// 因为List position fixed，计算的是top-right位置的x-y坐标
		// x- 屏幕总长- toggle-button宽度- toggle-button已占据x长度
		// y是从上到下计算的-
		// 留下的bug是position fixed 不是relative 导致跟着屏幕走
		setListPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		});

		openId !== id || openId === "" ? open(id) : close();
	}

	return (
		<StyledToggle onClick={handleToggle}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function List({ id, children }) {
	const { openId, listPosition, close } = useContext(MenusContext);
	const ref = useDetectClickOutside(() => {
		console.log("click outside to close");
		close();
	}, false);

	if (openId !== id) return null;
	return createPortal(
		<StyledList position={listPosition} ref={ref}>
			{children}
		</StyledList>,
		document.body
	);
}

function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContext);

	function handleClick() {
		onClick?.();
		close();
	}

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
