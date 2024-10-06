import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import BookingDetailPage from "./pages/BookingDetailPage";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import ErrorFallback from "./ui/ErrorFallback";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

// function PrivateRoute({ children }) {
// 	const isAuthenticated = true;
// 	return isAuthenticated && <Navigate index to="/dashboard" />;
// }
const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => window.location.replace("/")}
			>
				<ProtectedRoute>
					<AppLayout />
				</ProtectedRoute>
			</ErrorBoundary>
		),

		children: [
			{ path: "/", element: <Navigate index to="/dashboard" /> },
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "bookings", element: <Bookings /> },
			{ path: "bookings/:bookingId", element: <BookingDetailPage /> },
			{ path: "checkin/:bookingId", element: <Checkin /> },
			{ path: "cabins", element: <Cabins /> },
			{ path: "users", element: <Users /> },
			{ path: "settings", element: <Settings /> },
			{ path: "account", element: <Account /> },
		],
	},
	{ path: "login", element: <Login /> },
	{ path: "*", element: <PageNotFound /> },
]);

function App() {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />

				<RouterProvider router={router} />

				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							border: "1px solid #713200",
							padding: "16px",
							color: "#713200",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
