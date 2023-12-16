







$(document).ready(function () {
    // Manipular o envio do formulário de consulta de freelancers por cidade
    $('#habilidades-filter').on('change', function (event) {
        event.preventDefault();
        const habilidade = $('[name = habilidades]').val();

        $.ajax({
            type: 'POST',  // Altere para POST
            url: '/vagas-por-habilidades',
            data: { habilidades: habilidade },
            success: function (result) {
                exibirResultado(result, 'resultado-filtro', 'filtroHabilidades');
            },
            error: function (error) {
                console.error('Erro na solicitação AJAX:', error);
            }
        });
    });

    
    function exibirResultado(result, elementoId, tipoConsulta) {
        const resultadoElemento = $('#' + elementoId);
        resultadoElemento.empty();
        if (tipoConsulta === "freelancersPorCidade") {
            resultadoElemento.append(`<h2>Quantidade: ${result.length}</h2>`);
        }

        if (result.length === 0) {
            resultadoElemento.append('<p>Nenhum resultado encontrado.</p>');
        } else {
            for (let i = 0; i < result.length; i++) {
                const item = result[i];

                // Ajuste esta parte de acordo com a estrutura dos seus resultados
                let descricaoFormatada;
                if (tipoConsulta === "filtroHabilidades") {

                    descricaoFormatada = `
                    <div class="feed-cards" id="feed-cards">
                        <h4 class="vaga-title-card">${item.titulo}</h4>
                        <p class="description-vaga">${item.descricao}</p>
                        <div class=""><p>${item.habilidade}</p></div>
                        <div><p>${item.proposta}</p></div>
                    </div>`;

                } else if (tipoConsulta === "servicosMais500") {
                    descricaoFormatada = ` 
                <table class="tabela">    
                    <tr>
                        <td class="tab1">Descrição</td>
                        <td class ="tab2">${item.titulo}</td>
                    </tr>
                    <p class="linha"> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  </p>
                    <tr class="tab">
                        <td class="tab1">Proposta</td>
                        <td class ="tab2">R$ ${item.proposta}</td>
                    </tr>
                </table>`;
                } else if (tipoConsulta === "numServicosPorEstado") {
                    descricaoFormatada = `
                    <table class="tabela">
                        <tr>
                            <td class="tab1">Estado</td> 
                            <td class ="tab2">${item.Estado}</td>
                        </tr>
                        <tr>
                            <td class="tab1">Número de Serviços</td>
                            <td class="tab2"> ${item.num_servicos}</td>
                        </tr>
                    </table>`;
                } else {
                    // Adicione mais casos conforme necessário para outros tipos de consulta
                    descricaoFormatada = JSON.stringify(item); // Padrão: mostrar JSON se o tipo não for reconhecido
                }

                resultadoElemento.append(`<p>${descricaoFormatada}</p>`);
            }
        }
    }


    window.criarFreelancer = function () {
        const dadosFreelancer = {
            nome_completo: $('#nome_completo').val(),
            email: $('#email').val(),
            telefone: $('#telefone').val(),
            cpf_cnpj: $('#cpf_cnpj').val(),
            data_nascimento: $('#data_nascimento').val(),
            senha: $('#senha').val(),
            criado_em: $('#criado_em').val(),
            descricao: $('#descricao').val(),
            competencias: $('#competencias').val(),
            cep: $('#cep').val()
        };

        $.ajax({
            type: 'POST',
            url: '/criar-freelancer',
            data: dadosFreelancer,
            success: function (result) {
                console.log('Freelancer criado com sucesso:', result);
                alert("Freelancer criado com sucesso!");
            },
            error: function (err) {
                console.error(err);
            }
        });
    };


});