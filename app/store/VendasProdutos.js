Ext.define('Vendas.store.VendasProdutos', {
    extend: 'Ext.data.Store',
    model: 'Vendas.model.VendaProduto',    
    proxy: {
        type   : 'rest',
        url    : 'php/vendasProdutos.php',
        reader : {
            type            : 'json',
            root            : 'vendasProdutos',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'vendasProdutos',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    }
});