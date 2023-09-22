import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

// Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Query Client
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/config/queryClient';

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}
