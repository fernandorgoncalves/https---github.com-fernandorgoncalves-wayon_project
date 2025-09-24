import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postApiData } from "../../services/apiServices";
import "./TransferForm.css";

//

function TransferForm() {
  const [formData, setFormData] = useState({
    sourceAccount: "",
    destinationAccount: "",
    transferValue: "",
    transferDate: "",
  });

  const [errors, setErrors] = useState({});
  

  const isFormValid =
    formData.sourceAccount &&
    formData.destinationAccount &&
    formData.transferValue &&
    formData.transferDate &&
    !Object.values(errors).some(Boolean); // Garante que não há erros de validação

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    // Inclui a data de agendamento e a taxa no envio
    mutationFn: (newTransfer) => postApiData("transfers", newTransfer),
    onSuccess: (data) => {
      console.log("Transferência agendada:", data);
      alert("Transferência agendada com sucesso!");

      queryClient.invalidateQueries({ queryKey: ["transfers"] });

      setFormData({
        sourceAccount: "",
        destinationAccount: "",
        transferValue: "",
        transferDate: "",
      });
      setErrors({});
      
    },
    onError: (err) => {
      // Tenta extrair uma mensagem de erro mais amigável da resposta da API.
      // A API pode retornar um objeto como { message: '...' } ou { error: '...' }.
      const apiErrorMessage =
        err.response?.data?.message || err.response?.data?.error;

      const errorInfo = {
        // Usa a mensagem da API se existir, senão a mensagem de erro padrão.
        message: apiErrorMessage || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        url: err.config?.url,
        method: err.config?.method?.toUpperCase(),
        data: err.response?.data,
      };

      console.error("Erro detalhado ao agendar transferência:", errorInfo);
      
    },
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "sourceAccount" || name === "destinationAccount") {
      value = value.replace(/[^0-9]/g, "");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};

    if (!formData.sourceAccount)
      newErrors.sourceAccount = "Conta de origem é obrigatória.";
    if (!formData.destinationAccount)
      newErrors.destinationAccount = "Conta de destino é obrigatória.";
    if (!formData.transferValue)
      newErrors.transferValue = "Valor da transferência é obrigatório.";
    if (!formData.transferDate)
      newErrors.transferDate = "Data da transferência é obrigatória.";
    if (
      formData.sourceAccount &&
      formData.sourceAccount === formData.destinationAccount
    ) {
      newErrors.destinationAccount = "A conta de destino não pode ser igual à de origem.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const schedulingDate = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    const transferPayload = {
      ...formData,
      transferValue: parseFloat(formData.transferValue),
      schedulingDate: schedulingDate,
    };

    console.log("Enviando para API:", transferPayload);
    mutate(transferPayload);
  };

  return (
    <div className="container d-flex jcenter">
    <div className="transfer-form">
      <h2>Novo Agendamento</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Conta de Origem:</label>
          <input
            type="text"
            name="sourceAccount"
            placeholder="XXXXXXXXXX"
            maxLength="10"
            value={formData.sourceAccount}
            onChange={handleChange}
          />
          {errors.sourceAccount && (
            <span className="error-message">{errors.sourceAccount}</span>
          )}
        </div>

        <div className="form-group">
          <label>Conta de Destino:</label>
          <input
            type="text"
            name="destinationAccount"
            placeholder="XXXXXXXXXX"
            maxLength="10"
            value={formData.destinationAccount}
            onChange={handleChange}
          />
          {errors.destinationAccount && (
            <span className="error-message">{errors.destinationAccount}</span>
          )}
        </div>

        <div className="form-group">
          <label>Valor da Transferência:</label>
          <input
            type="number"
            name="transferValue"
            placeholder="R$ 0,00"
            value={formData.transferValue}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
          {errors.transferValue && (
            <span className="error-message">{errors.transferValue}</span>
          )}
        </div>

        <div className="form-group">
          <label>Data da Transferência:</label>
          <input
            type="date"
            name="transferDate"
            className="date-input"
            value={formData.transferDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" >
          
        </button>
      </form>
    </div>
    </div>
  );
}

export default TransferForm;
