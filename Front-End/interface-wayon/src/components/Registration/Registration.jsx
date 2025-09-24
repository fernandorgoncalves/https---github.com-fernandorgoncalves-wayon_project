import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApiData } from "../../services/apiServices";
import "./Registration.css";

function Registration() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    // Assumindo que o endpoint para cadastrar clientes seja '/clients'
    mutationFn: (clientPayload) => postApiData("clients", clientPayload),
    onSuccess: () => {
      alert("Cliente cadastrado com sucesso!");
      // Invalida queries relacionadas a clientes, se houver.
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setName("");
      setError("");
    },
    onError: (err) => {
      const apiErrorMessage =
        err.response?.data?.message || err.response?.data?.error;
      const errorMessage = apiErrorMessage || err.message;
      alert(`Erro ao cadastrar cliente: ${errorMessage}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("O nome é obrigatório.");
      return;
    }
    setError("");
    mutate({ name });
  };

  return (
    <div className="container d-flex al-center jc-center">
      <div className="registration-form">
        <h2>Cadastro de Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome do Cliente:</label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" disabled={isPending}>
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
