import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;
const Label = styled.label`
	font-weight: 500;
`;
const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;
	const { isSigningup, signupMutate } = useSignup();

	function onSubmit({ full_name, email, password }) {
		console.log(full_name, email, password);
		signupMutate(
			{ email, password, full_name },
			{
				onSettled: () => reset(),
			}
		);
	}
	function onError(error) {
		console.log("form inptu error", error);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow>
				<Label>Full name</Label>
				<Input
					type="text"
					id="fullName"
					disabled={isSigningup}
					{...register("full_name", {
						required: "this field required",
					})}
				/>
				{errors?.full_name?.message && (
					<Error>{errors?.full_name?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label>email</Label>
				<Input
					type="email"
					id="email"
					disabled={isSigningup}
					{...register("email", {
						required: "this field required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "valid email is required",
						},
					})}
				/>
				{errors?.email?.message && (
					<Error>{errors?.email?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label>Password (min 8 characters)</Label>
				<Input
					type="password"
					id="password"
					disabled={isSigningup}
					{...register("password", {
						required: "this field required",
						minLength: {
							value: 8,
							message: "minimun of 8 characters",
						},
					})}
				/>
				{errors?.password?.message && (
					<Error>{errors?.password?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label>Repeat password</Label>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isSigningup}
					{...register("password_confirm", {
						required: "this field required",
						validate: (curValue) =>
							curValue === getValues().password ||
							"need to match bro",
					})}
				/>
				{errors?.password_confirm?.message && (
					<Error>{errors?.password_confirm?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					disabled={isSigningup}
					onClick={reset}
				>
					Cancel
				</Button>
				<Button disabled={isSigningup}>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
