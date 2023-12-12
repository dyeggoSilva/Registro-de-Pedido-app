const apiUrl = 'https://registro-de-pedio-api.dyeggochocolat.repl.co';
    
function criarPedido() {
    const pedido = document.getElementById('pedido').value;
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const telefone = document.getElementById('telefone').value;

    fetch(`${apiUrl}/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pedido: pedido,
            nome: nome,
            produto: produto,
            telefone: telefone,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido criado:', data);
        listarPedidos();
    })
    .catch(error => {
        console.error('Erro ao criar pedido:', error);
    });
}

function listarPedidos() {
    fetch(`${apiUrl}/pedidos`)
    .then(response => response.json())
    .then(data => {
        const pedidosBody = document.getElementById('pedidosBody');
        pedidosBody.innerHTML = '';

        data.forEach(pedido => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.pedido}</td>
                <td>${pedido.nome}</td>
                <td>${pedido.produto}</td>
                <td>${pedido.telefone}</td>
                <td><button onclick="at(${pedido.id})">Atualizar</button> <button onclick="ex(${pedido.id})">Excluir</button></td>
            `;
            pedidosBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro ao listar pedidos:', error);
    });
}

function at(id) {

    const pedido = document.getElementById('pedido').value;
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const telefone = document.getElementById('telefone').value;

    fetch(`${apiUrl}/dados/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pedido: pedido,
            nome: nome,
            produto: produto,
            telefone: telefone,
        }),
    })

    .then(response => response.json())
    .then(data => {
        console.log('Atualizar pedido com ID:', id);
        listarPedidos();
    })
    .catch(error => {
        console.error('Erro ao excluir pedido:', error);
    });
    
}

function ex(id) {
    fetch(`${apiUrl}/dados/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido excluído:', data);
        listarPedidos();
    })
    .catch(error => {
        console.error('Erro ao excluir pedido:', error);
    });
}