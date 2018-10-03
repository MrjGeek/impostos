Ext.define('Vendas.store.Vendas', {
    extend: 'Ext.data.Store',
    model: 'Vendas.model.Venda',    
    proxy: {
        type   : 'rest',
        url    : 'php/vendas.php',
        reader : {
            type            : 'json',
            root            : 'vendas',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'vendas',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    },
    listeners: {        
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);                       
            if (obj.success) {
                Ext.Msg.alert('Sucesso!', 'Venda '+obj.action+'da com Sucesso!');                
            }
            else {
                Ext.Msg.alert('Erro', 'Problema ao '+obj.action+'r Venda!');               
            }
        }
    }    
});