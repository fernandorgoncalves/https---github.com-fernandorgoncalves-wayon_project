import "./GridDados.css";

function GridDados({ data, loading, error }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="grid-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container d-flex al-center jc-center">
    <div className="grid-container">
      <table>
        <thead>
          <tr>
            <th>Conta de Origem</th>
            <th>Conta de Destino</th>
            <th>Valor</th>
            <th>Data da Transferência</th>
            <th>Data do Agendamento</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.sourceAccount}</td>
                <td>{item.destinationAccount}</td>
                <td>{formatCurrency(item.transferValue)}</td>
                <td>{formatDate(item.transferDate)}</td>
                <td>{formatDate(item.schedulingDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma transferência encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default GridDados;
