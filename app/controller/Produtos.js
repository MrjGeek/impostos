Ext.define('Vendas.controller.Produtos', {
    extend: 'Ext.app.Controller',
    views : ['produto.Grid','produto.Formulario'],
    stores: ['Produtos', 'Categorias'],
    init: function() {
        this.control({
            'produtosgrid button[action=btnAdicionarProdutos]': {
                click: this.adicionarProduto
            },
            'produtosgrid button[action=btnEditarProdutos]': {
                click: this.editarProduto
            },  
            'produtosgrid button[action=btnExcluirProdutos]': {
                click: this.deletarProduto
            },
            'produtoform button[action=btnSalvarCategorias]': {
                click: this.abrirCategorias
            },
            'produtoform button[action=btnRemoverCategorias]': {
                click: this.removerCategorias
            },                              
            'produtoform button[action=btnSalvarProduto]': {
                click: this.salvarProduto
            },
            'categoriabuscagrid button[action=btnBuscarCategoria]': {
                click: this.buscarCategorias
            },
            'categoriabuscagrid button[action=btnInserirCategoria]': {
                click: this.inserirCategoria
            },                        
        });
    },

    adicionarProduto: function() {
        Ext.create('Vendas.view.produto.Formulario').show();  
    },

    editarProduto: function() {
        var grid   = Ext.ComponentQuery.query('produtosgrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var win = Ext.create('Vendas.view.produto.Formulario').show();
            win.down('form').loadRecord(record[0]);
        }
    },

    deletarProduto: function() {
        var grid   = Ext.ComponentQuery.query('produtosgrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else if (record[0].data.vinculado > 0) {
            Ext.Msg.alert('Atenção', 'Este Produto não pode ser excluido pois está vinculado a um ou mais vendas');
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
                        var store = this.getProdutosStore();
                        store.remove(record);      
                        store.sync();
                    }
                }
            });
        }
    },

    abrirCategorias: function() {           
        Ext.create('Vendas.view.produto.CategoriaBusca').show();
        this.getCategoriasStore().load();
    },

    removerCategorias: function() {            
        Ext.ComponentQuery.query('produtoform #categorias_idcategorias')[0].setValue(null);
        Ext.ComponentQuery.query('produtoform #nomecategoria')[0].setValue(null);                
    },

    salvarProduto: function(button) {           
        var win    = button.up('window');
        var form   = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var store  = this.getProdutosStore();

        if (values.idprodutos > 0) {
            record.set(values);
        }
        else {
            record = Ext.create('Vendas.model.Produto');
            record.set(values);
            store.add(record);          
        }            

        store.sync();    

        win.close();
    },

    buscarCategorias: function() {
        var busca = Ext.ComponentQuery.query('categoriabuscagrid #buscarCategoria')[0].getValue();
        var store = this.getCategoriasStore();
        store.load({
            params: {
                busca: busca
            }
        });
    },

    inserirCategoria: function(button) {           
        var win    = button.up('window');
        var grid   = Ext.ComponentQuery.query('categoriabuscagrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            Ext.ComponentQuery.query('produtoform #categorias_idcategorias')[0].setValue(record[0].data.idcategorias);
            Ext.ComponentQuery.query('produtoform #nomecategoria')[0].setValue(record[0].data.nome);
            win.close();
        }
    }
});