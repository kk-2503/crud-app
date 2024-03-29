import { ToastContainer } from 'react-toastify';
import { Navbar } from './Navbar';

export function Layout({ children }) {
	return (
		<>
			<Navbar />

			<div className="bg-blue-100 h-screen p-10 mw-200">
				<div className="container mx-auto h-full">{children}</div>
			</div>
			<ToastContainer />
		</>
	);
}
