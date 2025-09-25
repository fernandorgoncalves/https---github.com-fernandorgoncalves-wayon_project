import React, { useState, useMemo } from "react";
import "./ConsultForm.css";
import GridDados from "../gridDados/GridDados";
import { getApiData } from "../../services/apiServices";
import { useQuery } from "@tanstack/react-query";

function ConsultForm() {
  const [searchTerm] = useState("");

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
    <div className="container d-flex al-center jc-center">
    <div className="consult-form">
      <h2>Consulta de transferência</h2>
      <GridDados data={displayData} loading={isLoading} error={error?.message} />
    </div>
    </div>
  );
}
export default ConsultForm;
