
import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApiData } from "../../services/apiServices";
import "./TransferForm.css";

function TransferForm() {
  const [formData, setFormData] = useState({
    sourceAccount: "",
    destinationAccount: "",
    transferValue: "",
    transferDate: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(null);

  const isFormValid = useMemo(
    () =>
      formData.sourceAccount &&
      formData.destinationAccount &&
      formData.transferValue &&
      formData.transferDate &&
      Object.values(errors).every((error) => !error),
    [formData, errors]
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (transferPayload) => postApiData("transfers", transferPayload),
    onSuccess: () => {
      alert("Transferência agendada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transfers"] });
      setFormData({
        sourceAccount: "",
        destinationAccount: "",
        transferValue: "",
        transferDate: "",
      });
      setErrors({});
      setSubmissionError(null);
    },
    onError: (err) => {
      const apiErrorMessage =
        err.response?.data?.message || err.response?.data?.error;
      
      const errorMessage = apiErrorMessage || err.message;

      // Log detalhado para depuração no console
      console.error("Erro detalhado ao agendar transferência:", {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
      });

      // Exibe um alerta para o usuário
      alert(`Erro ao agendar a transferência: ${errorMessage}`);
      setSubmissionError(errorMessage); // Guarda a mensagem de erro
    },
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "sourceAccount":
      case "destinationAccount":
        if (!/^\d{6}$/.test(value)) {
          error = "A conta deve ter 6 dígitos numéricos.";
        }
        break;
      case "transferValue":
        if (parseFloat(value) <= 0) {
          error = "O valor da transferência deve ser maior que zero.";
        }
        break;
      case "transferDate":
        if (!value) {
          error = "A data da transferência é obrigatória.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Payload ajustado para enviar contas como string
    const transferPayload = {
      sourceAccount: formData.sourceAccount,
      destinationAccount: formData.destinationAccount,
      transferValue: parseFloat(formData.transferValue),
      transferDate: formData.transferDate,
    };

    // Log do payload antes de enviar para a API
    console.log("Enviando payload para agendamento:", transferPayload);

    mutate(transferPayload);
  };
  return (
    <div className="container d-flex ">
      <div className="transfer-form">
        <h2>Novo Agendamento</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Conta de Origem:</label>
            <input
              type="text"
              name="sourceAccount"
              placeholder="000000"
              maxLength="6"
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
              placeholder="000000"
              maxLength="6"
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
              step="0.01"
              min="0.01"
              value={formData.transferValue}
              onChange={handleChange}
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
            {errors.transferDate && (
              <span className="error-message">{errors.transferDate}</span>
            )}
          </div>

          <button type="submit" disabled={!isFormValid || isPending}>
            {isPending ? (
              <>
                <span className="spinner"></span> Agendando...
              </>
            ) : (
              "Agendar"
            )}
          </button>
          {submissionError && (
            <p className="error-message submission-error">{submissionError}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default TransferForm;
