import "../styles/globals.css";
import { Provider, useDispatch } from "react-redux";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTDocumentsProvider } from "../Context/NFTDocumentsContext";
import store from '../redux/store';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <Provider store={store}>
      <NFTDocumentsProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </NFTDocumentsProvider>
    </Provider>
  </div>
);

export default MyApp;