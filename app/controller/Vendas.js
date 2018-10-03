Ext.define('Vendas.controller.Vendas', {
    extend: 'Ext.app.Controller',
    views : ['venda.Grid','venda.Formulario'],
    stores: ['Vendas', 'Produtos','VendasProdutos'],
    init: function() {
        this.control({
            'vendasgrid button[action=btnAdicionarVendas]': {
                click: this.adicionarVenda
            },
            'vendasgrid button[action=btnEditarVendas]': {
                click: this.editarVenda
            },  
            'vendasgrid button[action=btnExcluirVendas]': {
                click: this.deletarVenda
            },
            'vendaform button[action=btnSalvarProdutos]': {
                click: this.abrirProdutos
            },
            'vendaform button[action=btnInserirVenda]': {
                click: this.inserirProdVenda
            },                                       
            'vendaform button[action=btnSalvarVenda]': {
                click: this.salvarVenda
            },
            'vendaform numberfield[name=recebido]': {
                change: this.calculatroco
            },            
            'produtobuscagrid button[action=btnBuscarProdutos]': {
                click: this.buscarProdutos
            },
            'produtobuscagrid button[action=btnInserirProdutos]': {
                click: this.inserirProdutos
            },                        
        });
    },

    adicionarVenda: function() {
        Ext.create('Vendas.view.venda.Formulario').show();
        this.getVendasProdutosStore().loadData([],false);        
    },

    editarVenda: function() {
        var grid   = Ext.ComponentQuery.query('vendasgrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var win = Ext.create('Vendas.view.venda.Formulario').show();
            win.down('form').loadRecord(record[0]);
            this.getVendasProdutosStore().load({
                params: {
                    vendas_idvendas: record[0].data.idvendas
                }
            });            
        }
    },

    deletarVenda: function() {
        var grid   = Ext.ComponentQuery.query('vendasgrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }     
        else {
            Ext.Msg.show({
                title   : 'Confirmação',
                msg     : 'Tem certeza que deseja deletar o registro selecionado?',
                buttons : Ext.Msg.YESNO,
                icon    : Ext.MessageBox.QUESTION,
                scope   : this,
                width   : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        var store = this.getVendasStore();
                        store.remove(record);      
                        store.sync();
                    }
                }
            });
        }
    },

    abrirProdutos: function() {           
        Ext.create('Vendas.view.venda.ProdutoBusca').show();
        this.getProdutosStore().load();
    },

    inserirProdVenda: function () {
        var quantidade          = Ext.ComponentQuery.query('vendaform #quantidade')[0].getValue();
        var produtos_idprodutos = Ext.ComponentQuery.query('vendaform #produtos_idprodutos')[0].getValue();

        if (quantidade > 0 && produtos_idprodutos > 0) {
            var produtos_idprodutos = Ext.ComponentQuery.query('vendaform #produtos_idprodutos')[0].getValue();
            var nomeproduto         = Ext.ComponentQuery.query('vendaform #nomeproduto')[0].getValue();
            var valorsemimposto     = Ext.ComponentQuery.query('vendaform #valorprodsemimposto')[0].getValue();
            var valor               = Ext.ComponentQuery.query('vendaform #valorprod')[0].getValue();
            var store               = this.getVendasProdutosStore();
            var record              = Ext.create('Vendas.model.VendaProduto'); 
            record.set({
                produtos_idprodutos : produtos_idprodutos,
                total               : valor * quantidade,
                totalsemimposto     : valorsemimposto * quantidade,
                nomeproduto         : nomeproduto,
                quantidade          : quantidade,
                valor               : valor,
                valorsemimposto     : valorsemimposto
            });
            store.add(record);
            this.calculatotal();
            Ext.ComponentQuery.query('vendaform #quantidade')[0].setValue(null);
            Ext.ComponentQuery.query('vendaform #produtos_idprodutos')[0].setValue(null);
            Ext.ComponentQuery.query('vendaform #nomeproduto')[0].setValue(null);
            Ext.ComponentQuery.query('vendaform #valorprodsemimposto')[0].setValue(null);
            Ext.ComponentQuery.query('vendaform #valorprod')[0].setValue(null);            
        }
        else {
            Ext.Msg.alert('Atenção', 'Insira a quantidade e o produto');
            return false;            
        }
    },

    calculatotal: function () {
        var store           = this.getVendasProdutosStore();
        var cont            = store.count();
        var totalsemimposto = 0;
        var totalimposto    = 0;
        var total           = 0;
        for (a = 0; a < cont; a++) {
            total           += parseFloat(store.data.items[a].data.total);
            totalsemimposto += parseFloat(store.data.items[a].data.totalsemimposto);
        }
        totalimposto = total - totalsemimposto;
        Ext.ComponentQuery.query('vendaform #valorsemimposto')[0].setValue(totalsemimposto);
        Ext.ComponentQuery.query('vendaform #impostos')[0].setValue(totalimposto);
        Ext.ComponentQuery.query('vendaform #valor')[0].setValue(total);
        this.calculatroco();
    },

    calculatroco: function() {
        var recebido = Ext.ComponentQuery.query('vendaform #recebido')[0].getValue();
        if (recebido > 0) {
            var troco = 0;
            var total = Ext.ComponentQuery.query('vendaform #valor')[0].getValue();
            troco = parseFloat(recebido) - parseFloat(total);
            Ext.ComponentQuery.query('vendaform #troco')[0].setValue(troco);
        }
        else {
            Ext.ComponentQuery.query('vendaform #troco')[0].setValue(null);
        }
    },

    salvarVenda: function(button) {           
        var win       = button.up('window');
        var form      = win.down('form');
        var record    = form.getRecord();
        var values    = form.getValues();
        var store     = this.getVendasStore();
        var storeProd = this.getVendasProdutosStore();
        var cont      = storeProd.count();

        if (cont > 0) {

            if (values.idvendas > 0) {
                record.set(values);
            }
            else {
                record = Ext.create('Vendas.model.Venda');
                record.set(values);
                store.add(record);          
            }            

            store.sync({
                success: function() {                           
                    idvenda =  parseInt(store.getProxy().getReader().rawData.vendas.idvendas); 
                    storeProd.proxy.extraParams = {
                        vendas_idvendas: idvenda
                    } 
                    storeProd.sync();    
                }
            });    


            win.close();
        }
        else {
            Ext.Msg.alert('Atenção', 'Insira produtos');
            return false;            
        }
    },

    buscarProdutos: function() {
        var busca = Ext.ComponentQuery.query('produtobuscagrid #buscarProdutos')[0].getValue();
        var store = this.getProdutosStore();
        store.load({
            params: {
                busca: busca
            }
        });
    },

    inserirProdutos: function(button) {           
        var win    = button.up('window');
        var grid   = Ext.ComponentQuery.query('produtobuscagrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            Ext.ComponentQuery.query('vendaform #produtos_idprodutos')[0].setValue(record[0].data.idprodutos);
            Ext.ComponentQuery.query('vendaform #nomeproduto')[0].setValue(record[0].data.nome);
            Ext.ComponentQuery.query('vendaform #valorprodsemimposto')[0].setValue(record[0].data.valorsemimposto);
            Ext.ComponentQuery.query('vendaform #valorprod')[0].setValue(record[0].data.valor);
            win.close();
        }
    }
});