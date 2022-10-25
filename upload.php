<?php
$filename = $_FILES['file']['name'];
$tmpname = $_FILES['file']['tmp_name'];
$fileup_name = time().$filename;
move_uploaded_file($tmpname, "upload/".$fileup_name);
?>