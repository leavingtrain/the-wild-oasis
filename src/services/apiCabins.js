import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("couldnt load cabins");
	}

	return data;
}

export async function editCabin(newCabin, id) {
	console.log("厨师data", newCabin, id);
	const hasImagePath = newCabin.cabinImage?.startsWith?.(supabaseUrl);
	console.log("是否没有改图", hasImagePath);

	const imageName = `${String(Math.random()).slice(7)}-${
		newCabin.cabinImage.name
	}`.replaceAll("/", "");
	console.log("bb", newCabin.cabinImage);
	const imagePath = hasImagePath
		? newCabin.cabinImage
		: `${supabaseUrl}/storage/v1/object/public/cabin-imgs/${imageName}`;
	const {
		cabinName: cabin_name,
		maxCapacity: max_capacity,
		regularPrice: regular_price,
		discount,
	} = newCabin;
	let query = supabase.from("cabins");
	query = query
		.update({
			cabin_name,
			max_capacity,
			regular_price,
			discount,
			cabin_image: imagePath,
		})
		.eq("id", id);
	const { data, error } = await query.select().single();
	console.log("suc", data);

	if (error) {
		console.error(error);
		throw new Error("couldnt edit cabin");
	}

	if (!hasImagePath) {
		const { error: storageError } = await supabase.storage
			.from("cabin-imgs")
			.upload(imageName, newCabin.cabinImage);
		if (storageError) {
			await supabase.from("cabins").delete().eq("id", data.id);
			console.error(storageError);
			throw new Error("couldnt upload file");
		}
	}
	return data;
}
export async function insertCabin(newCabin) {
	const imageName = `${String(Math.random()).slice(7)}-${
		newCabin.image.name
	}`.replaceAll("/", "");
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-imgs/${imageName}`;
	const {
		name: cabin_name,
		maxCapacity: max_capacity,
		regularPrice: regular_price,
		discount,
		description,
		// image: cabin_image,
	} = newCabin;

	const { data, error } = await supabase
		.from("cabins")
		.insert([
			{
				cabin_name,
				max_capacity,
				regular_price,
				discount,
				description,
				cabin_image: newCabin.image?.startsWith?.(supabaseUrl)
					? newCabin.image
					: imagePath,
			},
		])
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("couldnt upload cabin");
	}
	if (newCabin.image?.startsWith?.(supabaseUrl)) return data;

	const { error: storageError } = await supabase.storage
		.from("cabin-imgs")
		.upload(imageName, newCabin.image);
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error("couldnt upload file");
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("couldnt delete cabin");
	}

	return data;
}
