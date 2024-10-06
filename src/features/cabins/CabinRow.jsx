import styled from "styled-components";
import { useState } from "react";
import {
	GiDoubleDragon,
	// GiSwordInStone,
	// GiEvilWings,
	// GiHummingbird,
	GiTrashCan,
	GiFly,
} from "react-icons/gi";

import EditCabinForm from "./EditCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useInsertCabin } from "./useInsertCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
// 	display: grid;
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// 	column-gap: 2.4rem;
// 	align-items: center;
// 	padding: 1.4rem 2.4rem;

// 	&:not(:last-child) {
// 		border-bottom: 1px solid var(--color-grey-100);
// 	}
// `;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const {
		id,
		cabin_name: cabinName,
		max_capacity: maxCapacity,
		regular_price: regularPrice,
		discount,
		cabin_image: cabinImage,
	} = cabin;

	const [showEditForm, setShowEditForm] = useState(false);

	const { isDeleting, delMutate } = useDeleteCabin();

	const { isInserting, insMutate } = useInsertCabin();
	function handleDuplicate() {
		insMutate({
			name: `copy of ${cabinName}`,
			maxCapacity,
			regularPrice,
			discount,
			image: cabinImage,
		});
	}

	// Table中一行行展示quertClient得到的cabins data
	return (
		<>
			<Table.Row>
				<img src={cabinImage} alt="" />
				<Cabin>{cabinName}</Cabin>
				<div>Fits up to {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				{discount ? (
					<Discount>{formatCurrency(discount)}</Discount>
				) : (
					<span>&mdash;</span>
				)}
				{/* <button onClick={handleDuplicate} disabled={isInserting}>
						<GiDoubleDragon />
					</button>
					<button onClick={() => setShowEditForm((s) => !s)}>
						<GiFly />
					</button> */}
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={id} />

						<Menus.List id={id}>
							<Menus.Button
								icon={<GiDoubleDragon />}
								onClick={handleDuplicate}
								disabled={isInserting}
							>
								duplicate
							</Menus.Button>

							<Menus.Button
								icon={<GiFly />}
								onClick={() => setShowEditForm((s) => !s)}
							>
								edit
							</Menus.Button>

							<Modal.Open opens="deleteConfirm">
								<Menus.Button icon={<GiTrashCan />}>
									delete
								</Menus.Button>
								{/* <button>
									<GiTrashCan />
								</button> */}
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="deleteConfirm">
							<ConfirmDelete
								resourceName="cabin"
								disabled={isDeleting}
								onConfirm={() => delMutate(id)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Table.Row>
			{showEditForm && (
				<EditCabinForm
					setShowEditForm={setShowEditForm}
					cabinToEdit={{
						id,
						cabinImage,
						cabinName,
						maxCapacity,
						regularPrice,
						discount,
					}}
				/>
			)}
		</>
	);
}

export default CabinRow;
