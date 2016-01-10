<?php

function init() {
	$dir = 'sqlite:stockMonitor.sqlite3';
 
	// Instantiate PDO connection object and failure msg //
	$db = new PDO($dir) or die("cannot open database");
	$db->query("CREATE TABLE IF NOT EXISTS config (entity varchar(10), identifier varchar(300))");
	return $db;
}

function getAll($entity) {
	$db = init();
	$result = $db->query("SELECT * FROM config WHERE entity = '" . $entity . "'");
	
	$datapie = array();
	$result->setFetchMode(PDO::FETCH_ASSOC);

	while ($row = $result->fetch()) {
		$a = array();
		$a["entity"] = $row["entity"];
		$a["identifier"] = $row["identifier"];
		$datapie[] = $a;
	}

	$data = json_encode($datapie);
	return $data;
}

function save($entity, $identifier) {
	$db = init();
	$result = sqlite_query($db, "INSERT INTO config (entity, identifier) VALUES('" . $entity . "', '" . $identifier . "')");
}

function delete($entity, $identifier) {
	$db = init();
	$result = sqlite_query($db, "DELETE FROM config WHERE entity = '" . $entity . "' AND identifier = '" . $identifier . "'");
}

function sqlite_open($location,$mode)
{
    $handle = new SQLite3($location);
    return $handle;
}
function sqlite_query($dbhandle,$query)
{
    $array['dbhandle'] = $dbhandle;
    $array['query'] = $query;
    $result = $dbhandle->query($query);
    return $result;
}

?>