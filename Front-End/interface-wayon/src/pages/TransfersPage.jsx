import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


import ConsultForm from "../components/ConsultForm/ConsultForm";
import TransferForm from "../components/TransferForm/TransferForm";

import "swiper/swiper-bundle.css"; // Importa todos os estilos do Swiper de uma vez
import "./TransfersPage.css"; // Mantém seus estilos personalizados

function TransfersPage() {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation, Autoplay, Mousewheel]}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        direction="horizontal"
        slidesPerView={1}
        mousewheel={true}
        style={{ height: "90vh", width: "90vw" }}
      >
        <SwiperSlide>
          <TransferForm />
        </SwiperSlide>

        <SwiperSlide>
          <ConsultForm />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default TransfersPage;
