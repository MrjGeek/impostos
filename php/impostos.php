<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listaImpostos();
			break;

		case 'POST':
			criaImpostos();
			break;

		case 'PUT':
			atualizaImpostos();
			break;

		case 'DELETE':
			deletaImpostos();
			break;
	}

	function listaImpostos() {
		if (isset($_GET['busca'])) {
			$busca = $_GET['busca'];
		}
		else {
			$busca = "";
		}

		$filtro = "";
		if ($busca != "") {
			$filtro = "WHERE nome ILIKE '%$busca%'";
		}
		
		$queryString = "SELECT 	idimpostos, nome, porcentagem,
							(SELECT COUNT(idimpostoscategoria) FROM impostoscategoria WHERE impostos_idimpostos = idimpostos) as vinculado
						FROM impostos
						$filtro
						ORDER BY idimpostos ";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$impostos = array();

		while($imp = pg_fetch_assoc($query)){
			$impostos[] = $imp;
		}

		echo json_encode(array(
			"success"  => $success,
			"impostos" => $impostos
		));			
	}

	function criaImpostos() {
		$info        = $_POST['impostos'];
		$data        = json_decode($info);
		$nome        = $data->nome;
		$porcentagem = $data->porcentagem;

		$query = "	INSERT INTO impostos(nome, porcentagem) 
					VALUES ('$nome', $porcentagem) 
					RETURNING idimpostos;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idimpostos'];		 				
		}


		echo json_encode(array(
			"success"   => $success,
			"action"    => "Inseri",
			"impostos" => array(
				"idimpostos"  => $id,
				"nome"        => $nome,
				"porcentagem" => $porcentagem
			)
		));	
	}

	function atualizaImpostos() {
		parse_str(file_get_contents("php://input"), $post_vars);		
		$info        = $post_vars['impostos'];
		$data        = json_decode($info);
		$idimpostos  = $data->idimpostos;
		$nome        = $data->nome;
		$porcentagem = $data->porcentagem;

		$query = "UPDATE impostos SET nome = '$nome', porcentagem = '$porcentagem' WHERE idimpostos = $idimpostos;";
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
			"impostos" => array(
				"idimpostos"  => $idimpostos,
				"nome"        => $nome,
				"porcentagem" => $porcentagem
			)
		));
	}

	function deletaImpostos() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info       = $post_vars['impostos'];
		$data       = json_decode($info);
		$idimpostos = $data->idimpostos;		

		$query = "DELETE FROM impostos WHERE idimpostos = $idimpostos";
		$rs    = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}

		echo json_encode(array(
			"success" => $success,
			"action" => "Exclui",
		));
	}
?>