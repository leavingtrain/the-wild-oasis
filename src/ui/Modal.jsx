import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import {
	cloneElement,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;
// 1. context
const ModalContext = createContext();

// 2. parent compo and value provider
function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	// close是直接setter empty string，open是设置string state方便conditionaly render
	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, open, close }}>
			{children}
		</ModalContext.Provider>
	);
}

// 3. child compo read value and do its task
function Open({ children, opens }) {
	const { open } = useContext(ModalContext);

	return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
	const { close, openName } = useContext(ModalContext);
	const ref = useRef();
	console.log(ref);

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) {
					console.log("??");
					close();
				}
			}

			document.addEventListener("click", handleClick, true);

			return () =>
				document.removeEventListener("click", handleClick, true);
		},
		[close]
	);

	if (openName !== name) return null;
	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}
// 4. declare js obj.property
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
