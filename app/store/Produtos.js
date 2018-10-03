Ext.define('Vendas.store.Produtos', {
    extend: 'Ext.data.Store',
    model: 'Vendas.model.Produto',    
    proxy: {
        type   : 'rest',
        url    : 'php/produtos.php',
        reader : {
            type            : 'json',
            root            : 'produtos',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'produtos',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    },
    listeners: {        
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);                       
            if (obj.success) {
                Ext.Msg.alert('Sucesso!', 'Produto '+obj.action+'do com Sucesso!');                
            }
            else {
                Ext.Msg.alert('Erro', 'Problema ao '+obj.action+'r Produto!');               
            }
        }
    }    
});