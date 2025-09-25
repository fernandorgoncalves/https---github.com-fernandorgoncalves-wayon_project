import React, { useState } from "react";
import "./ConsultForm.css";
import GridDados from "../gridDados/GridDados";
import { getApiData } from "../../services/apiServices";
import { useQuery } from "@tanstack/react-query";

function ConsultForm() {
  const [showGrid, setShowGrid] = useState(false);

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transfers"],
    queryFn: () => getApiData("transfers"),
    enabled: false, // Impede a busca automática ao carregar o componente
  });

  const handleConsult = () => {
    setShowGrid(true);
    refetch(); // Executa a busca de dados
  };

  return (
    <div className="container d-flex jc-center container-consult">
      <div className="consult-form">
        <h2>Consultar Agendamentos</h2>

        <div className="consult-group">
          <button onClick={handleConsult} disabled={isLoading}>
            {isLoading ? "Consultando..." : "Consultar"}
          </button>
        </div>
        {showGrid && (
          <GridDados data={data} loading={isLoading} error={error?.message} />
        )}
      </div>
    </div>
  );
}

export default ConsultForm;