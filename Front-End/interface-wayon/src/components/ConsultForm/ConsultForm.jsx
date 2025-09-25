import React, { useState, useMemo } from "react";
import "./ConsultForm.css";
import GridDados from "../gridDados/GridDados";
import { getApiData } from "../../services/apiServices";
import { useQuery } from "@tanstack/react-query";

function ConsultForm() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: allData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transfers"],
    queryFn: () => getApiData("transfers"),
  });

  const displayData = useMemo(() => {
    if (!searchTerm) {
      return allData;
    }
    return allData.filter((item) =>
      item.sourceAccount.includes(searchTerm)
    );
  }, [allData, searchTerm]);

  return (
    <div className="consult-form">
      <h2>Consulta de transferência</h2>

      <div className="consult-group">
        <label>Conta de Origem:</label>
        <input
          type="text"
          name="sourceAccount"
          placeholder="Digite a conta de origem"
          maxLength="6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <GridDados data={displayData} loading={isLoading} error={error?.message} />
    </div>
  );
}

export default ConsultForm;