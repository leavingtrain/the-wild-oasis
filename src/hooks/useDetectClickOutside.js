import { useEffect, useRef } from "react";

export function useDetectClickOutside(handler, onlyCapturing = true) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) {
					handler();
				}
			}

			document.addEventListener("click", handleClick, onlyCapturing);

			return () =>
				document.removeEventListener(
					"click",
					handleClick,
					onlyCapturing
				);
		},
		[handler, onlyCapturing]
	);

	return ref;
}
