Ext.define('Vendas.store.Categorias', {
    extend: 'Ext.data.Store',
    model: 'Vendas.model.Categoria',    
    proxy: {
        type   : 'rest',
        url    : 'php/categorias.php',
        reader : {
            type            : 'json',
            root            : 'categorias',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'categorias',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    },
    listeners: {        
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);                       
            if (obj.success) {
                Ext.Msg.alert('Sucesso!', 'Categoria '+obj.action+'da com Sucesso!');                
            }
            else {
                Ext.Msg.alert('Erro', 'Problema ao '+obj.action+'r Categoria!');               
            }
        }
    }    
});