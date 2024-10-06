import styled, { css } from "styled-components";

const hoverText = {
	hello: css`
		background-color: var(--color-grey-50);
		content: "hello";
	`,
	acc: css`
		background-color: var(--color-blue-100);
		content: "account";
	`,
	logout: css`
		background-color: var(--color-red-100);
		content: "logout";
	`,
	darkmode: css`
		background-color: var(--color-grey-300);
		content: "darkmode";
	`,
	lightmode: css`
		background-color: var(--color-grey-50);
		content: "lightmode";
	`,
};
const ButtonIcon = styled.button`
	background: none;
	border: none;
	padding: 0.6rem;
	border-radius: var(--border-radius-sm);
	transition: all 0.2s;
	position: relative;

	&:hover {
		background-color: var(--color-grey-100);
	}
	&:hover::before {
		${(props) => hoverText[props.ht]};
		opacity: 0.3;
		display: block;
		position: absolute;
		top: 100%;
		left: 0;
		padding: 10px;
		visibility: 10%;
	}

	& svg {
		width: 2.2rem;
		height: 2.2rem;
		color: var(--color-brand-600);
	}
`;
ButtonIcon.defaultProps = { ht: "hello" };

export default ButtonIcon;
