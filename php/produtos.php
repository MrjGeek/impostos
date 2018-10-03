<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listaProdutos();
			break;

		case 'POST':
			criaProdutos();
			break;

		case 'PUT':
			atualizaProdutos();
			break;

		case 'DELETE':
			deletaProdutos();
			break;
	}

	function listaProdutos() {

		if (isset($_GET['busca'])) {
			$busca = $_GET['busca'];
		}
		else {
			$busca = "";
		}

		$filtro = "";
		if ($busca != "") {
			$filtro = "WHERE p.nome ILIKE '%$busca%'";
		}		
		
		$queryString = "SELECT 	p.idprodutos, p.categorias_idcategorias, p.nome, p.valor, p.valorsemimposto,
								c.nome as nomecategoria,
								(SELECT COUNT(idvendasprodutos) FROM vendasprodutos WHERE produtos_idprodutos = idprodutos) as vinculado
						FROM produtos p
						INNER JOIN categorias c ON c.idcategorias = p.categorias_idcategorias
						$filtro
						ORDER BY p.idprodutos";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$produtos = array();

		while($prod = pg_fetch_assoc($query)){
			$produtos[] = $prod;
		}

		echo json_encode(array(
			"success"  => $success,
			"produtos" => $produtos
		));			
	}

	function criaProdutos() {
		$info                    = $_POST['produtos'];
		$data                    = json_decode($info);
		$nome                    = $data->nome;
		$valorsemimposto         = $data->valorsemimposto;
		$categorias_idcategorias = $data->categorias_idcategorias;
		$valor                   = valorliquido($valorsemimposto, $categorias_idcategorias);

		$query = "	INSERT INTO produtos(nome, valor, valorsemimposto, categorias_idcategorias) 
					VALUES ('$nome', $valor, $valorsemimposto, $categorias_idcategorias) 
					RETURNING idprodutos;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idprodutos'];		 				
		}


		echo json_encode(array(
			"success"  => $success,
			"action"   => "Inseri",
			"produtos" => array(
				"idprodutos"              => $id,
				"nome"                    => $nome,
				"categorias_idcategorias" => $categorias_idcategorias,
				"valor"                   => $valor,
				"valorsemimposto"         => $valorsemimposto
			)
		));	
	}

	function atualizaProdutos() {
		parse_str(file_get_contents("php://input"), $post_vars);		
		$info                    = $post_vars['produtos'];
		$data                    = json_decode($info);
		$idprodutos              = $data->idprodutos;
		$nome                    = $data->nome;
		$valorsemimposto         = $data->valorsemimposto;
		$categorias_idcategorias = $data->categorias_idcategorias;
		$valor                   = valorliquido($valorsemimposto, $categorias_idcategorias);

		$query = "	UPDATE produtos 
					SET nome = '$nome', valorsemimposto = '$valorsemimposto', valor = $valor, categorias_idcategorias = '$categorias_idcategorias' 
					WHERE idprodutos = $idprodutos;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}
		 
		echo json_encode(array(
			"success"  => $success,
			"action"   => "Atualiza",
			"produtos" => array(
				"idprodutos"              => $idprodutos,
				"nome"                    => $nome,
				"categorias_idcategorias" => $categorias_idcategorias,
				"valor"                   => $valor,
				"valorsemimposto"         => $valorsemimposto
			)
		));
	}

	function deletaProdutos() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info       = $post_vars['produtos'];
		$data       = json_decode($info);
		$idprodutos = $data->idprodutos;		

		$query = "DELETE FROM produtos WHERE idprodutos = $idprodutos";
		$rs    = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}

		echo json_encode(array(
			"success" => $success,
			"action"  => "Exclui",
		));
	}

	function valorliquido ($bruto = 0, $categoria = 0) {
		$valorfinal  = 0;
		$queryString = "SELECT i.porcentagem
						FROM impostoscategoria ic
						INNER JOIN impostos i ON i.idimpostos = ic.impostos_idimpostos
						WHERE ic.categorias_idcategorias = $categoria";
		$query     = pg_query($queryString);
		$valorporc = 0;
		$somaporc  = 0;
		while($porc = pg_fetch_assoc($query)){
			$valorporc = 0;
			$valorporc = ($bruto*$porc['porcentagem'])/100;
			$somaporc += $valorporc;
		}		

		$valorfinal = $bruto + $somaporc;
		return $valorfinal;
	}
?>