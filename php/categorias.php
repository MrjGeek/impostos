<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listaCategorias();
			break;

		case 'POST':
			criaCategorias();
			break;

		case 'PUT':
			atualizaCategorias();
			break;

		case 'DELETE':
			deletaCategorias();
			break;
	}

	function listaCategorias() {

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
		
		$queryString = "SELECT idcategorias, nome, 0 as editar,
						(SELECT COUNT(idprodutos) FROM produtos WHERE categorias_idcategorias = idcategorias) as vinculado
						FROM   categorias
						$filtro
						ORDER BY idcategorias";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$categorias = array();

		while($cat = pg_fetch_assoc($query)){
			$categorias[] = $cat;
		}

		echo json_encode(array(
			"success"    => $success,
			"categorias" => $categorias
		));			
	}

	function criaCategorias() {
		$info = $_POST['categorias'];
		$data = json_decode($info);
		$nome = $data->nome;

		$query = "	INSERT INTO categorias(nome) 
					VALUES ('$nome') 
					RETURNING idcategorias;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idcategorias'];		 				
		}


		echo json_encode(array(
			"success"   => $success,
			"action"    => "Inseri",
			"categorias" => array(
				"idcategorias" => $id,
				"nome"         => $nome
			)
		));	
	}

	function atualizaCategorias() {
		parse_str(file_get_contents("php://input"), $post_vars);		
		$info         = $post_vars['categorias'];
		$data         = json_decode($info);
		$idcategorias = $data->idcategorias;
		$nome         = $data->nome;

		$query = "UPDATE categorias SET nome = '$nome' WHERE idcategorias = $idcategorias;";
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
			"categorias" => array(
				"idcategorias" => $idcategorias,
				"nome"         => $nome
			)
		));
	}

	function deletaCategorias() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info         = $post_vars['categorias'];
		$data         = json_decode($info);
		$idcategorias = $data->idcategorias;		

		$query  = "DELETE FROM impostoscategoria WHERE categorias_idcategorias = $idcategorias;";
		$query .= "DELETE FROM categorias WHERE idcategorias = $idcategorias;";
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
?>