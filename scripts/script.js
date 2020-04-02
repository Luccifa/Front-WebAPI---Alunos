
    	var tbody = document.querySelector('table tbody');
    	var aluno = {}; 

		function Cadastrar(){
			  			

			<!-- Utilizando o getElementByID -->
			<!--var _nome = document.getElementById('nome').value; -->
			<!--var _sobrenome = document.getElementById('sobrenome').value; -->
			<!--var _telefone = document.getElementById('telefone').value; -->
			<!--var _rA = document.getElementById('rA').value;
			

			<!-- Utilizando o querySelector -->
			<!-- var _nome = document.querySelector('#nome').value; -->
			<!-- var _sobrenome = document.querySelector('#sobrenome').value; --> 
			<!-- var _telefone = document.querySelector('#telefone').value; -->
			<!-- var _rA = document.querySelector('#rA').value; -->

			<!-- Montando JSON -->
			<!-- var aluno = { -->
			<!-- 	nome: _nome, -->
			<!-- 	sobrenome: _sobrenome, -->
			<!-- 	telefone: _telefone, -->
			<!-- 	ra: _rA -->
			<!-- } -->

			aluno.nome = document.querySelector('#nome').value;
			aluno.sobrenome = document.querySelector('#sobrenome').value;
			aluno.telefone = document.querySelector('#telefone').value;
			aluno.ra = document.querySelector('#ra').value; 

			console.log(aluno);

			if (aluno.id === undefined || aluno.id === 0)
			{			
				salvarEstudantes('POST', 0, aluno);
			}
			else
			{
				salvarEstudantes('PUT', aluno.id, aluno);
			}	
		    carregaEstudantes();

			$('#myModal').modal('hide')

		}

		function NovoAluno(){
			var btnSalvar = document.querySelector('#btnSalvar');
	    	var tituloModal = document.querySelector('#tituloModal');

			document.querySelector('#nome').value = '';
			document.querySelector('#sobrenome').value = '';
			document.querySelector('#telefone').value = '';
			document.querySelector('#ra').value = '';

	    	aluno = '';

	    	btnSalvar.textContent = 'Cadastrar';
			tituloModal.textContent = 'Cadastrar Aluno';

			$('#myModal').modal('show')

		}

		function Cancelar(){
			var btnSalvar = document.querySelector('#btnSalvar');
	    	<!--var btnCancelar = document.querySelector('#btnCancelar');-->
	    	var tituloModal = document.querySelector('#tituloModal');

			document.querySelector('#nome').value = '';
			document.querySelector('#sobrenome').value = '';
			document.querySelector('#telefone').value = '';
			document.querySelector('#ra').value = '';

	    	aluno = '';

	    	btnSalvar.textContent = 'Cadastrar';
	    	<!--btnCancelar.textContent = 'Limpar';-->
			tituloModal.textContent = 'Cadastrar Aluno';

			$('#myModal').modal('hide')

		}

		function carregaEstudantes() {
			tbody.innerHTML = '';

			var xhr = new XMLHttpRequest();
         	console.log('USENT', xhr.readyState);

			<!-- configurando o send -->
			<!-- GET , URL, true = assincrono -->
			xhr.open('GET', `https://localhost:44381/api/Aluno/Recuperar`, true);
			console.log(sessionStorage.getItem('token'));
			xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

         	console.log('OPENED', xhr.readyState);

         	xhr.onprogress = function() {
         		console.log('LOADING', xhr.readyState);
			};

			xhr.onerror = function() {
         		console.log('ERRO', xhr.readyState);
			}

			<!--xhr.onload = function () {-->
			
			xhr.onreadystatechange = function () {
			 	if (this.readyState == 4) {
			 		if(this.status == 200) {
							<!--console.log(this.responseText);-->
							var estudantes = JSON.parse(this.responseText);
							console.log('DONE', xhr.readyState);
							for(var indice in estudantes){
								adicionaLinha(estudantes[indice]);
							}
					}
					else if(this.status == 500) {
							var erro = JSON.parse(this.responseText);
							console.log(erro.Message);
							console.log(erro.ExceptionMessage);
					}		
				}
			}

   			xhr.send();


			<!-- Logs anteriores -->
			<!-- console.log(aluno) -->
			<!-- console.log(_nome + _sobrenome + _telefone + _rA) -->
	
		}    


		function salvarEstudantes(metodo, id, corpo) {
			var xhr = new XMLHttpRequest();

			if (id === undefined || id === 0)
				id = '';

			<!-- configurando o send -->
			<!-- GET , URL, true = sincrono -->
			xhr.open(metodo, `https://localhost:44381/api/Aluno/${id}`, false);

			xhr.setRequestHeader('content-type', 'application/json');
			xhr.send(JSON.stringify(corpo));
	
		}    
	    

		function excluirEstudantes(id) {
			var xhr = new XMLHttpRequest();

			<!-- configurando o send -->
			<!-- GET , URL, true = sincrono -->
			xhr.open('DELETE', `https://localhost:44381/api/Aluno/${id}`, false);

			xhr.send();
	
		}    

		function excluir(estudante){

			bootbox.confirm({
			    message: `Tem certeza que deseja excluir estudante ${estudante.nome}`,
			    buttons: {
			        confirm: {
			            label: 'SIM',
			            className: 'btn-success'
			        },
			        cancel: {
			            label: 'NÃO',
			            className: 'btn-danger'
			        }
			    },
			    callback: function (result) {
			        if(result)
					{	
						excluirEstudantes(estudante.id);
						carregaEstudantes();
					}	
			    }
			});

			<!--if(confirm("Tem certeza que deseja excluir estudante"))-->
			<!-- alert("teste")-->
		}

	    carregaEstudantes();

	    function editarEstudante(estudante){
	    	var btnSalvar = document.querySelector('#btnSalvar');
	    	<!--var btnCancelar = document.querySelector('#btnCancelar');-->
	    	var tituloModal = document.querySelector('#tituloModal');

			document.querySelector('#nome').value = estudante.nome;
			document.querySelector('#sobrenome').value = estudante.sobrenome;
			document.querySelector('#telefone').value = estudante.telefone;
			document.querySelector('#ra').value = estudante.ra;

	    	btnSalvar.textContent = 'Salvar';
	    	<!--btnCancelar.textContent = 'Cancelar';-->
	    	tituloModal.textContent = `Editar Aluno ${estudante.nome}`;

	    	aluno = estudante;
	    	console.log(aluno);
	    }

	    function adicionaLinha(estudante){

	    	var trow = `<tr>
	    					<td>${estudante.nome}</td>
	    					<td>${estudante.sobrenome}</td>
	    					<td>${estudante.telefone}</td>
	    					<td>${estudante.ra}</td>
	    					<td>
	    						<button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick='editarEstudante(${JSON.stringify(estudante)})'>Editar<!button>
	    						<button class="btn btn-danger" onclick='excluir(${JSON.stringify(estudante)})'>Excluir<!button>
	    					</td>
	    				</tr>	
	    				`
	    	tbody.innerHTML += trow;			
	    }

