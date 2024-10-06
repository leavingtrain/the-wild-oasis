import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signupCall } from "../../services/apiAuth";

export function useSignup() {
	const { mutate: signupMutate, isLoading: isSigningup } = useMutation({
		mutationFn: (formData) => signupCall(formData),
		onSuccess: (newUser) => {
			console.log(newUser);
			toast.success(
				"account created, go to verify your email and address"
			);
		},
	});

	return { signupMutate, isSigningup };
}
