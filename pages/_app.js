import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

// Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
