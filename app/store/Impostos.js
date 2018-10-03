Ext.define('Vendas.store.Impostos', {
    extend: 'Ext.data.Store',
    model: 'Vendas.model.Imposto',    
    proxy: {
        type   : 'rest',
        url    : 'php/impostos.php',
        reader : {
            type            : 'json',
            root            : 'impostos',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'impostos',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    },
    listeners: {        
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);                       
            if (obj.success) {
                Ext.Msg.alert('Sucesso!', 'Imposto '+obj.action+'do com Sucesso!');                
            }
            else {
                Ext.Msg.alert('Erro', 'Problema ao '+obj.action+'r Imposto!');               
            }
        }
    }    
});