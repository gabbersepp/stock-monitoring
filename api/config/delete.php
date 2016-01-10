<?php
include("repository.php");

$entity = $_GET["entity"];
$identifier = $_GET["identifier"];

delete($entity, $identifier);

?>