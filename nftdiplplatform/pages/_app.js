import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTDocumentsProvider } from "../Context/NFTDocumentsContext";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTDocumentsProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </NFTDocumentsProvider>
  </div>
);

export default MyApp;