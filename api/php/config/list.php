<?php
include("repository.php");

$entity = $_GET["entity"];

header('Content-Type: text/plain');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
echo getAll($entity);

?>