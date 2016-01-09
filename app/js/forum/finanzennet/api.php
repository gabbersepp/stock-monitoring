<?php

	$id = $_GET["id"];
    header('Content-Type: text/plain');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
	$url = "http://forum.finanzen.net/parts/rss_forum_thread.xml?thread=" . $id;
    readfile($url);
	
?>