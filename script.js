function registrarHoras() {
  var name = document.getElementById("name").value;
  var date = document.getElementById("date").value;
  var entryTime = document.getElementById("entryTime").value;
  var exitTime = document.getElementById("exitTime").value;
 
  var formattedDate = formatarData(date);
  var formattedEntryTime = formatarHora(entryTime);
  var formattedExitTime = formatarHora(exitTime);
 
  var hoursWorked = calcularHorasTrabalhadas(entryTime, exitTime);
  adicionarRegistroTabela(name, formattedDate, formattedEntryTime, formattedExitTime, hoursWorked);
 
  document.getElementById("timeForm").reset();
}


function formatarData(date) {
  var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  var [year, month, day] = date.split('-');
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', options);
}


function formatarHora(time) {
  var options = { hour: 'numeric', minute: 'numeric', hour12: false };
  var [hours, minutes] = time.split(':');
  return new Date(1, 0, 2000, hours, minutes).toLocaleTimeString('pt-BR', options);
}


function calcularHorasTrabalhadas(entrada, saida) {
  var entradaSplit = entrada.split(":");
  var saidaSplit = saida.split(":");

  var entradaHora = parseInt(entradaSplit[0]);
  var entradaMinuto = parseInt(entradaSplit[1]);

  var saidaHora = parseInt(saidaSplit[0]);
  var saidaMinuto = parseInt(saidaSplit[1]);

  var totalHoras = 0;
  var totalMinutos = 0;

  if (saidaHora < entradaHora || (saidaHora === entradaHora && saidaMinuto < entradaMinuto)) {
    // Caso especial: funcionário trabalhou até o dia seguinte
    totalHoras = 24 - entradaHora + saidaHora;
    totalMinutos = saidaMinuto - entradaMinuto;
  } else {
    totalHoras = saidaHora - entradaHora;
    totalMinutos = saidaMinuto - entradaMinuto;
  }

  if (totalMinutos < 0) {
    totalMinutos += 60;
    totalHoras--;
  }

  var horasTrabalhadas = totalHoras.toString().padStart(2, "0") + ":" + totalMinutos.toString().padStart(2, "0");
  return horasTrabalhadas;
}


function adicionarRegistroTabela(name, date, entryTime, exitTime, hoursWorked) {
  var table = document.getElementById("timeTable");
  var row = table.insertRow(-1);
 
  var nameCell = row.insertCell(0);
  nameCell.innerHTML = name;
 
  var dateCell = row.insertCell(1);
  dateCell.innerHTML = date;
 
  var entryTimeCell = row.insertCell(2);
  entryTimeCell.innerHTML = entryTime;
 
  var exitTimeCell = row.insertCell(3);
  exitTimeCell.innerHTML = exitTime;
 
  var hoursWorkedCell = row.insertCell(4);
  hoursWorkedCell.innerHTML = hoursWorked;
 
  var actionsCell = row.insertCell(5);
  actionsCell.innerHTML = '<button class="edit-btn" onclick="editarRegistro(this)">Editar</button> <button class="delete-btn" onclick="excluirRegistro(this)">Excluir</button>';
}


function editarRegistro(button) {
  var row = button.parentNode.parentNode;

  var nameCell = row.cells[0];
  var dateCell = row.cells[1];
  var entryTimeCell = row.cells[2];
  var exitTimeCell = row.cells[3];
  var hoursWorkedCell = row.cells[4];
  var actionsCell = row.cells[5];

  var name = nameCell.innerHTML;
  var date = dateCell.innerHTML;
  var entryTime = entryTimeCell.innerHTML;
  var exitTime = exitTimeCell.innerHTML;
  var hoursWorked = hoursWorkedCell.innerHTML;

  nameCell.innerHTML = '<input type="text" value="' + name + '">';
  dateCell.innerHTML = '<input type="date" value="' + formatDateToISO(date) + '">';
  entryTimeCell.innerHTML = '<input type="time" value="' + entryTime + '">';
  exitTimeCell.innerHTML = '<input type="time" value="' + exitTime + '">';
  hoursWorkedCell.innerHTML = '<input type="text" value="' + hoursWorked + '" >';
  actionsCell.innerHTML = '<button class="save-btn" onclick="salvarEdicao(this)">Salvar</button> <button class="cancel-btn" onclick="cancelarEdicao(this)">Cancelar</button> <button class="delete-btn" onclick="excluirRegistro(this)">Excluir</button>';
}

function salvarEdicao(button) {
  var row = button.parentNode.parentNode;

  var nameCell = row.cells[0];
  var dateCell = row.cells[1];
  var entryTimeCell = row.cells[2];
  var exitTimeCell = row.cells[3];
  var hoursWorkedCell = row.cells[4];
  var actionsCell = row.cells[5];

  var name = nameCell.querySelector("input").value;
  var date = formatISOToDate(dateCell.querySelector("input").value);
  var entryTime = entryTimeCell.querySelector("input").value;
  var exitTime = exitTimeCell.querySelector("input").value;
  var hoursWorked = calculateHoursWorked(entryTime, exitTime);

  nameCell.innerHTML = name;
  dateCell.innerHTML = date;
  entryTimeCell.innerHTML = entryTime;
  exitTimeCell.innerHTML = exitTime;
  hoursWorkedCell.innerHTML = hoursWorked;
  actionsCell.innerHTML = '<button class="edit-btn" onclick="editarRegistro(this)">Editar</button> <button class="delete-btn" onclick="excluirRegistro(this)">Excluir</button>';
}

function cancelarEdicao(button) {
  var row = button.parentNode.parentNode;

  var nameCell = row.cells[0];
  var dateCell = row.cells[1];
  var entryTimeCell = row.cells[2];
  var exitTimeCell = row.cells[3];
  var hoursWorkedCell = row.cells[4];
  var actionsCell = row.cells[5];

  var name = nameCell.querySelector("input").value;
  var date = formatISOToDate(dateCell.querySelector("input").value);
  var entryTime = entryTimeCell.querySelector("input").value;
  var exitTime = exitTimeCell.querySelector("input").value;
  var hoursWorked = calculateHoursWorked(entryTime, exitTime);

  nameCell.innerHTML = name;
  dateCell.innerHTML = date;
  entryTimeCell.innerHTML = entryTime;
  exitTimeCell.innerHTML = exitTime;
  hoursWorkedCell.innerHTML = hoursWorked;
  actionsCell.innerHTML = '<button class="edit-btn" onclick="editarRegistro(this)">Editar</button> <button class="delete-btn" onclick="excluirRegistro(this)">Excluir</button>';
}

function excluirRegistro(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function calculateHoursWorked(entryTime, exitTime) {
  var entry = new Date("2000-01-01 " + entryTime);
  var exit = new Date("2000-01-01 " + exitTime);
  var diff = exit - entry;
  var hours = Math.floor(diff / 1000 / 60 / 60);
  var minutes = Math.floor((diff / 1000 / 60) % 60);
  return hours + "h " + minutes + "m";
}

function formatDateToISO(date) {
  var parts = date.split("/");
  return parts[2] + "-" + parts[1] + "-" + parts[0];
}

function formatISOToDate(date) {
  var parts = date.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}



function imprimirTabela() {
  var tabelaCompleta = document.getElementById("timeTable").outerHTML;
  var tabelaSomaHoras = document.getElementById("soma-horas").outerHTML;
  var janelaImprimir = window.open('', '', 'width=800,height=600');
  janelaImprimir.document.write('<html><head><title>Tabela de Horas Trabalhadas</title></head><body>');
  janelaImprimir.document.write(tabelaCompleta);
  janelaImprimir.document.write('<p><b>Funcionários</b>')
  janelaImprimir.document.write(tabelaSomaHoras);
  janelaImprimir.document.write('</p></body></html>');
  janelaImprimir.document.close();
  janelaImprimir.print();
}

  function somarHorasPorFuncionario() {
    var tabelaRegistros = document.getElementById("timeTable");
    var somaHorasPorFuncionario = {};
    var somaPlantoesPorFuncionario = {};
  
    for (var i = 1; i < tabelaRegistros.rows.length; i++) {
      var nomeFuncionario = tabelaRegistros.rows[i].cells[0].innerText;
      var horasTrabalhadas = tabelaRegistros.rows[i].cells[4].innerText;
  
      var [hours, minutes] = horasTrabalhadas.split(':');
      var totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  
      if (somaHorasPorFuncionario.hasOwnProperty(nomeFuncionario)) {
        somaHorasPorFuncionario[nomeFuncionario] += totalMinutes;
        somaPlantoesPorFuncionario[nomeFuncionario] += 1;
      } else {
        somaHorasPorFuncionario[nomeFuncionario] = totalMinutes;
        somaPlantoesPorFuncionario[nomeFuncionario] = 1;
      }
    }
  
    var tabelaSomaHoras = document.createElement("table");
    tabelaSomaHoras.classList.add("soma-horas");
  
    var cabecalho = tabelaSomaHoras.createTHead();
    var linhaCabecalho = cabecalho.insertRow();
    var celulaNome = linhaCabecalho.insertCell();
    celulaNome.innerText = "Funcionário";
    var celulaHoras = linhaCabecalho.insertCell();
    celulaHoras.innerText = "Total de Horas";
    var celulaPlantoes = linhaCabecalho.insertCell();
    celulaPlantoes.innerText = "Total de Plantões";
  
    for (var funcionario in somaHorasPorFuncionario) {
      var totalMinutes = somaHorasPorFuncionario[funcionario];
      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;
  
      var formattedHours = ("0" + hours).slice(-2);
      var formattedMinutes = ("0" + minutes).slice(-2);
  
      var linha = tabelaSomaHoras.insertRow();
      var celulaFuncionario = linha.insertCell();
      celulaFuncionario.innerText = funcionario;
      var celulaTotalHoras = linha.insertCell();
      celulaTotalHoras.innerText = formattedHours + ":" + formattedMinutes;
      var celulaTotalPlantoes = linha.insertCell();
      celulaTotalPlantoes.innerText = somaPlantoesPorFuncionario[funcionario];
    }
  
    var divSomaHoras = document.getElementById("soma-horas");
    divSomaHoras.innerHTML = "";
    divSomaHoras.appendChild(tabelaSomaHoras);
  }

  /*function exportarParaExcel() {
    var tabela = document.getElementById("timeTable");
    var somaHorasTable = document.getElementById("soma-horas");
  
    // Crie uma tabela temporária e adicione cópias de ambas as tabelas com uma linha vazia de separação
    var tabelaTemp = document.createElement("table");
    tabelaTemp.innerHTML = tabela.outerHTML + '<tr></tr>' + somaHorasTable.outerHTML;
  
    // Crie a planilha combinando ambas as partes
    var workbook = XLSX.utils.table_to_book(tabelaTemp);
  
    // Obtenha a data atual correta
    var dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate() + 1); // Adicione 1 dia à data atual
    var dia = ("0" + dataAtual.getDate()).slice(-2);
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
    var ano = dataAtual.getFullYear();
  
    // Ajuste: Verifique se o dia é 01 e, se for, ajuste o mês e o ano
    if (dia === "01") {
      mes = ("0" + (dataAtual.getMonth() + 2)).slice(-2);
      ano = dataAtual.getFullYear() + 1;
    }
  
    // Ajuste: Crie uma nova data apenas com a data correta
    var dataExportacao = new Date(ano, mes - 1, dia);
  
    // Ajuste: Adicione a data correta ao nome do arquivo
    var nomeArquivo = "horas_trabalhadas_" + dataExportacao.toLocaleDateString() + ".xlsx";
  
    // Exporte a planilha para um arquivo Excel
    XLSX.writeFile(workbook, nomeArquivo);
  }*/

  function exportarParaCSV() {
    var tabela = document.getElementById("timeTable");
    var somaHorasTable = document.getElementById("soma-horas");
  
    // Crie uma tabela temporária e adicione cópias de ambas as tabelas com uma linha vazia de separação
    var tabelaTemp = document.createElement("table");
    tabelaTemp.innerHTML = tabela.outerHTML + '<tr></tr>' + somaHorasTable.outerHTML;
  
    // Obtenha a data atual correta
    var dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate() + 1); // Adicione 1 dia à data atual
    var dia = ("0" + dataAtual.getDate()).slice(-2);
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
    var ano = dataAtual.getFullYear();
  
    // Ajuste: Verifique se o dia é 01 e, se for, ajuste o mês e o ano
    if (dia === "01") {
      mes = ("0" + (dataAtual.getMonth() + 2)).slice(-2);
      ano = dataAtual.getFullYear() + 1;
    }
  
    // Ajuste: Crie uma nova data apenas com a data correta
    var dataExportacao = new Date(ano, mes - 1, dia);
  
    // Ajuste: Adicione a data correta ao nome do arquivo
    var nomeArquivo = "horas_trabalhadas_" + dataExportacao.toLocaleDateString() + ".csv";
  
    // Obtenha o conteúdo da tabela como texto CSV
    var csvContent = "data:text/csv;charset=utf-8,";
  
    var linhas = tabelaTemp.querySelectorAll("tr");
    linhas.forEach(function (linha) {
      var colunas = linha.querySelectorAll("th, td");
      var linhaCSV = Array.from(colunas)
        .map(function (coluna) {
          return coluna.innerText;
        })
        .join(",");
      csvContent += linhaCSV + "\r\n";
    });
  
    // Crie um link de download e atribua o conteúdo CSV e o nome do arquivo
    var linkDownload = document.createElement("a");
    linkDownload.href = encodeURI(csvContent);
    linkDownload.download = nomeArquivo;
  
    // Simule um clique no link de download para iniciar o download do arquivo CSV
    linkDownload.click();
  }
  
  
  
  
  
  
 
  
  
  
  
  
  
  
  
  
  
  
