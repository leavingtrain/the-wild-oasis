import styled from "styled-components";

const StyledSelect = styled.select`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${(props) =>
			props.type === "white"
				? "var(--color-grey-100)"
				: "var(--color-grey-300)"};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

// ** trick, use spreador to destructure rest props into props
function Select({ selectValue, options, onChange, ...props }) {
	return (
		<StyledSelect {...props} value={selectValue} onChange={onChange}>
			{options.map((opt) => (
				<option value={opt.value} key={opt.value}>
					{opt.label}
				</option>
			))}
		</StyledSelect>
	);
}

export default Select;
