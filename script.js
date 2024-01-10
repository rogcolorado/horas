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
  dateCell.innerHTML = '<input type="date" value="' + date + '">';
  entryTimeCell.innerHTML = '<input type="time" value="' + entryTime + '">';
  exitTimeCell.innerHTML = '<input type="time" value="' + exitTime + '">';
  hoursWorkedCell.innerHTML = '<input type="text" value="' + hoursWorked + '" >';
  actionsCell.innerHTML = '<button class="save-btn" onclick="salvarEdicao(this)">Salvar</button> <button class="cancel-btn" onclick="cancelarEdicao(this)">Cancelar</button>';
}


function salvarEdicao(button) {
  var row = button.parentNode.parentNode;
 
  var nameCell = row.cells[0];
  var dateCell = row.cells[1];
  var entryTimeCell = row.cells[2];
  var exitTimeCell = row.cells[3];
  var hoursWorkedCell = row.cells[4];
  var actionsCell = row.cells[5];
 
  var name = nameCell.firstChild.value;
  var date = dateCell.firstChild.value;
  var entryTime = entryTimeCell.firstChild.value;
  var exitTime = exitTimeCell.firstChild.value;
  var hoursWorked = calcularHorasTrabalhadas(entryTime, exitTime);
 
  nameCell.innerHTML = name;
  dateCell.innerHTML = date;
  entryTimeCell.innerHTML = entryTime;
  exitTimeCell.innerHTML = exitTime;
  hoursWorkedCell.innerHTML = hoursWorked;
  actionsCell.innerHTML = '<button class="edit-btn" onclick="editarRegistro(this)">Edit</button> <button class="delete-btn" onclick="excluirRegistro(this)">Delete</button>';
}


function cancelarEdicao(button) {
  var row = button.parentNode.parentNode;
 
  var nameCell = row.cells[0];
  var dateCell = row.cells[1];
  var entryTimeCell = row.cells[2];
  var exitTimeCell = row.cells[3];
  var hoursWorkedCell = row.cells[4];
  var actionsCell = row.cells[5];
 
  var name = nameCell.firstChild.value;
  var date = dateCell.firstChild.value;
  var entryTime = entryTimeCell.firstChild.value;
  var exitTime = exitTimeCell.firstChild.value;
  var hoursWorked = hoursWorkedCell.firstChild.value;
 
  nameCell.textContent = name;
  dateCell.textContent = date;
  entryTimeCell.textContent = entryTime;
  exitTimeCell.textContent = exitTime;
  hoursWorkedCell.textContent = hoursWorked;
  actionsCell.textContent = '<button class="edit-btn" onclick="editarRegistro(this)">Editar</button> <button class="delete-btn" onclick="excluirRegistro(this)">Excluir</button>';
}


function excluirRegistro(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function imprimirTabela() {
  var tabelaCompleta = document.getElementById("timeTable").outerHTML;
  var tabelaSomaHoras = document.getElementById("soma-horas").outerHTML;
  var janelaImprimir = window.open('', '', 'width=800,height=600');
  janelaImprimir.document.write('<html><head><title>Tabela de Horas Trabalhadas</title></head><body>');
  janelaImprimir.document.write(tabelaCompleta);
  janelaImprimir.document.write(tabelaSomaHoras);
  janelaImprimir.document.write('</body></html>');
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
  
    // Crie elementos temporários para as tabelas
    var tabelaTemp = document.createElement("table");
    var somaHorasTemp = document.createElement("table");
  
    // Clone as tabelas originais para os elementos temporários
    tabelaTemp.innerHTML = tabela.outerHTML;
    somaHorasTemp.innerHTML = somaHorasTable.outerHTML;
  
    // Crie a planilha combinando as tabelas
    var workbook = XLSX.utils.table_to_book(tabelaTemp);
    var somaHorasSheet = XLSX.utils.table_to_book(somaHorasTemp);
  
    // Combine as planilhas
    XLSX.utils.book_append_sheet(workbook, somaHorasSheet.Sheets[somaHorasSheet.SheetNames[0]], 'SomaHoras');
  
    // Nome do arquivo de saída
    var nomeArquivo = "horas_trabalhadas.xlsx";
  
    // Exporte a planilha para um arquivo Excel
    XLSX.writeFile(workbook, nomeArquivo);
  }*/

  function exportarParaExcel() {
    var tabela = document.getElementById("timeTable");
    var somaHorasTable = document.getElementById("soma-horas");
  
    // Crie uma tabela temporária e adicione cópias de ambas as tabelas com uma linha vazia de separação
    var tabelaTemp = document.createElement("table");
    tabelaTemp.innerHTML = tabela.outerHTML + '<tr></tr>' + somaHorasTable.outerHTML;
  
    // Crie a planilha combinando ambas as partes
    var workbook = XLSX.utils.table_to_book(tabelaTemp);
  
    // Nome do arquivo de saída
    var nomeArquivo = "horas_trabalhadas.xlsx";
  
    // Exporte a planilha para um arquivo Excel
    XLSX.writeFile(workbook, nomeArquivo);
  }
  
  
  
  
  
  
  
