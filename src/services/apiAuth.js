import supabase, { supabaseUrl } from "./supabase";

export async function loginCall({ email, psw }) {
	console.log("appurl外首次登陆查询启动");
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password: psw,
	});

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function getCurUsr() {
	// get data session and user in localS: auth-token
	const { data: data1 } = await supabase.auth.getSession();
	console.log("PR一级localS查询启动", data1.session);

	if (!data1.session) return null;
	// re-download frm supabase is more secure
	const { data: data2 } = await supabase.auth.getUser();
	console.log("PR二级API查询启动", data2);

	return data2?.user;
}

export async function logoutCall() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function signupCall({ full_name, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { full_name: full_name, avatar: "" } },
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function updateCurrentUsr({ password, fullName, avatar }) {
	// update psw or fullname
	let updateData;
	if (password) updateData = { password };
	if (fullName) updateData = { data: { full_name: fullName } };
	const { data, error } = await supabase.auth.updateUser(updateData);
	console.log("接收数据", password, fullName, avatar);

	if (error) throw new Error(error.message);
	if (!avatar) return data;

	// upload avatar,
	const fileName = `avatar-${data.user.id}-${String(Math.random()).slice(2)}`;
	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);
	if (storageError) throw new Error(storageError.message);

	// update avatar
	const { data: updatedUser, error: uploadAvatarError } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
			},
		});
	if (uploadAvatarError) throw new Error(uploadAvatarError.message);
	return updatedUser;
}
