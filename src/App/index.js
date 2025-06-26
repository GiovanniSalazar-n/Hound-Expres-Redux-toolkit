import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGuideState } from "../redux/slices/guideSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Status from "../components/Status";
import Form from "../components/Form";
import Guide from "../components/Guide";
import Modal from "../components/Modal";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";
import GlobalStyles from "../theme/GlobalStyles";

function App() {
  const dispatch = useDispatch();
  const guides = useSelector((state) => state.guides.list);
  const history = useSelector((state) => state.guides.history);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const [total, setTotal] = useState(0);
  const [inTransit, setInTransit] = useState(0);
  const [delivered, setDelivered] = useState(0);

  useEffect(() => {
    setTotal(guides.length);
    setInTransit(guides.filter((g) => g.state === "En tránsito").length);
    setDelivered(guides.filter((g) => g.state === "Entregado").length);
  }, [guides]);

  const handleUpdate = (guideNumber) => {
    dispatch(updateGuideState(guideNumber));
  };

  const openModal = (guideNumber) => {
    setSelectedGuide(guideNumber);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGuide(null);
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Header />
      <main>
        <Form />
        <Status total={total} inTransit={inTransit} delivered={delivered} />
        <Guide
          guides={guides}
          onUpdate={handleUpdate}
          onViewHistory={openModal}
        />
      </main>
      <Footer />
      {modalOpen && (
        <Modal
          onClose={closeModal}
          history={history[selectedGuide] || []}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
