import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
	// Open的功能展示children，给children一个setter能够任意设置state string从而展示window
	// Window的功能展示Modal Window在doc.body，自带❌-close, 给children close window setter
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>add new cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCabin;
