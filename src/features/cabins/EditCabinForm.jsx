import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { editCabin } from "../../services/apiCabins";

const FormEdit = styled.form`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 1.2rem;
	align-items: center;
	padding: 1.4rem 2.4rem;
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	overflow: hidden;
	font-size: 1.4rem;

	position: relative;
`;
// &::file-selector-button著名pseudo ele专为 file type input，匹配btn，外面的font可以设置文本
// 使用a+fileinput
// 从原prop到hover到离开的transition: <property> <duration> <timing-function> <delay>
const FileEdit = styled.span`
	font: inherit;
	font-weight: 100;
	font-size: 10px;

	position: relative;
	/* display: inline-block; */
	background-color: var(--color-brand-500);
	border-radius: var(--border-radius-sm);
	border: none;
	padding: 4px;
	overflow: hidden;
	color: var(--color-brand-50);
	text-decoration: none;
	text-indent: 0;
	line-height: 20px;
	cursor: pointer;
	transition: color 0.2s, background-color 0.2s;
	&:hover {
		background-color: var(--color-brand-700);
	}
`;
const FileEditInput = styled.input.attrs({ type: "file" })`
	position: absolute;
	font-size: 0px;

	right: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
`;
const EditInput = styled.input`
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0)
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    padding: 0.4rem 0.6rem;
	width: 50%;
`;

const EditFormRow = styled.div`
	display: inline-block;
	align-items: center;

	/* grid-template-columns: 1fr; */
	/* gap: 2.4rem; */

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
		/* gap: 1.2rem; */
	}
`;

function CreateCabinForm({ cabinToEdit = {}, setShowEditForm }) {
	const { id: editId, ...editValues } = cabinToEdit;
	// 用来区分是insert or mutate使用
	// const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues } = useForm({
		defaultValues: editValues,
	});
	// const { errors: formValidErrors } = formState;

	const queryClient = useQueryClient();
	const { mutate, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabin, id2 }) => editCabin(newCabin, id2),
		onSuccess: () => {
			toast.success("cabin edited");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset();
			setShowEditForm(false);
		},
		onError: (err) => toast.error(err.message),
	});

	function onSubmit(formData) {
		console.log(formData.cabinImage);
		const img =
			typeof formData.cabinImage === "string"
				? formData.cabinImage
				: formData.cabinImage[0];
		// account for if image 是file 类型的object
		mutate({ newCabin: { ...formData, cabinImage: img }, id2: editId });
	}
	function onError(errorData) {
		console.log(errorData);
	}

	console.log("aa", getValues().cabinImage);
	return (
		<FormEdit onSubmit={handleSubmit(onSubmit, onError)}>
			<EditFormRow>
				<FileEdit>
					{editValues.cabinImage?.slice(-13, -4)}
					{/* {typeof getValues().cabinImage === "string"
						? getValues().cabinImage.slice(-13, -4)
						: getValues()?.cabinImage[0]?.name?.slice(0, -4)} */}
					<FileEditInput
						type="file"
						id="cabinImage"
						disabled={isEditing}
						accept="image/*"
						{...register("cabinImage")}
					/>
				</FileEdit>
			</EditFormRow>
			<EditFormRow>
				<EditInput
					type="text"
					id="cabinName"
					disabled={isEditing}
					{...register("cabinName", {
						required: "this field is required",
					})}
				/>
				{/* {formValidErrors?.cabinName?.message && (
					<Error>{formValidErrors.cabinName.message}</Error>
				)} */}
			</EditFormRow>

			<EditFormRow>
				<EditInput
					type="number"
					id="maxCapacity"
					disabled={isEditing}
					{...register("maxCapacity", {
						required: "this field is required",
						min: {
							value: 1,
							message: "a number must greater than 1",
						},
					})}
				/>
			</EditFormRow>

			<EditFormRow>
				<EditInput
					type="number"
					id="regularPrice"
					disabled={isEditing}
					{...register("regularPrice", {
						required: "this field is required",
					})}
				/>
			</EditFormRow>

			<EditFormRow>
				<EditInput
					type="number"
					id="discount"
					disabled={isEditing}
					{...register("discount", {
						required: "this field is required",
						// validate: (inputData) =>
						// 	inputData <= getValues().regularPrice ||
						// 	"discount must smaller than price",
					})}
				/>
			</EditFormRow>

			<EditFormRow>
				{/* type is an HTML attribute! */}
				<button disabled={isEditing}>edit</button>
				<button disabled={isEditing} type="reset">
					cancel
				</button>
			</EditFormRow>
		</FormEdit>
	);
}

export default CreateCabinForm;
