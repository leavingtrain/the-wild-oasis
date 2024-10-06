import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useInsertCabin } from "./useInsertCabin";

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

function CreateCabinForm({ onCloseModal }) {
	const { register, handleSubmit, reset, formState } = useForm();
	const { errors: formValidErrors } = formState;

	const { isInserting, insMutate } = useInsertCabin();

	function onSubmit(formData) {
		// 确保image 是file 类型的object
		insMutate(
			{ ...formData, image: formData.image[0] },
			{
				onSuccess: (data) => {
					reset();
					onCloseModal?.();
				},
			}
		);
	}
	function onError(errorData) {
		// console.log(errorData);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow>
				<Label htmlFor="name">Cabin name</Label>
				<Input
					type="text"
					id="name"
					disabled={isInserting}
					{...register("name", {
						required: "this field is required",
					})}
				/>
				{formValidErrors?.name?.message && (
					<Error>{formValidErrors.name.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="maxCapacity">Maximum capacity</Label>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isInserting}
					{...register("maxCapacity", {
						required: "this field is required",
						min: {
							value: 1,
							message: "a number must greater than 1",
						},
					})}
				/>
				{formValidErrors?.maxCapacity?.message && (
					<Error>{formValidErrors.maxCapacity.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="regularPrice">Regular price</Label>
				<Input
					type="number"
					id="regularPrice"
					disabled={isInserting}
					{...register("regularPrice", {
						required: "this field is required",
					})}
				/>
				{formValidErrors?.regularPrice?.message && (
					<Error>{formValidErrors.regularPrice.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					disabled={isInserting}
					defaultValue={0}
					{...register("discount", {
						required: "this field is required",
						// validate: (inputData) =>
						// 	inputData <= getValues().regularPrice ||
						// 	"discount must smaller than price",
					})}
				/>
				{formValidErrors?.discount?.message && (
					<Error>{formValidErrors.discount.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description for website</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "this field is required",
					})}
				/>
				{formValidErrors?.description?.message && (
					<Error>{formValidErrors.description.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput
					type="file"
					id="image"
					disabled={isInserting}
					accept="image/*"
					{...register("image", {
						required: "this field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isInserting} variation="primary">
					add cabin
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
