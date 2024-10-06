import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getSettings } from "../../services/apiSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";

function UpdateSettingsForm() {
	const a = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings(),
	});
	console.log("Query一直在反悔的", a);
	console.log("data到没", a.data);

	// const { settings, error, isLoading } = a;
	const { data: settings = {}, isLoading } = a;
	const {
		breakfast_price: breakfastPrice,
		max_booking_length: maxBookingLength,
		max_guests_per_booking: maxGuestsPerBooking,
		min_booking_length: minBookingLength,
	} = settings;
	console.log("现在到没", settings);
	// console.log("zzzzz", breakfastPrice);

	// register为了register formData以及formData validation
	// handleSubmit为了能在onClick将formData传递给myCallback
	// reset重置input
	// getValues 返回各input的value
	// formState能返回未通过validation的error obj

	const { isEditing, editMutate } = useEditSettings();
	function handleEdit(inputData, field) {
		const { value } = inputData.target;
		if (!value) return;

		editMutate(
			{ [field]: value },
			{
				onSuccess: () => toast.success("edited"),
			}
		);
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isEditing}
					onBlur={(e) => handleEdit(e, "min_booking_length")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isEditing}
					onBlur={(e) => handleEdit(e, "max_booking_length")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					disabled={isEditing}
					onBlur={(e) => handleEdit(e, "max_guests_per_booking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disabled={isEditing}
					onBlur={(e) => handleEdit(e, "breakfast_price")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
