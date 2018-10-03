Ext.define('Vendas.store.ImpostosCategorias', {
    extend: 'Ext.data.Store',
    model: 'Vendas.model.ImpostosCategoria',    
    proxy: {
        type   : 'rest',
        url    : 'php/impostosCategorias.php',
        reader : {
            type            : 'json',
            root            : 'impostosCategorias',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'impostosCategorias',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    }
});