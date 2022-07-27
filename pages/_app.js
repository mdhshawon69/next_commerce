import { Provider } from "react-redux";
import { Layout } from "../components";
import store from "../store/store";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster />
      <NextNProgress color='#f02d34' options={{ showSpinner: false }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
