import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useCacheUser } from "../features/authentication/useCacheUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	// navigate 不能用在toplevelofcompo，
	const navigate = useNavigate();
	// 0. 在routes中protect applayout
	// 1. load authenticated usr..
	//	 为了从serverside supabase refetch to check usr whether exist and still authened
	//	 	apiA中 从localS中拿到auth-token data localSusr，利用该supabase从sb中拿到 api User
	//	 	store api user in cache using Query
	// 		首次登陆后就手动set usr into cache.. queryClient 的第三种方法，，避免使用useLogin拿过一次数据后，还得在登录时在因为protected措施原因重复拿一次

	const { isLoading, isAuthenticated } = useCacheUser();

	// 3. if there is no authenticated, redir
	// 		只要apiUsr role='authened' 那么就可以直接进入app不必拦在login
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) navigate("/login");
		},
		[isAuthenticated, isLoading, navigate]
	);

	// 2. spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4. if there is authened, render app routes
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
