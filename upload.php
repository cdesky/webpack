<?php 
	$file_path = 'uploads/';
    $tempFile = $_FILES['uploadFile']['tmp_name'];
    var_dump($_FILES['uploadFile']);

    $fileTypes = array('jpg','jpeg','gif','png','xls','xlsx','txt','doc','docx'); // File extensions

    $fileInfo=pathinfo($_FILES['uploadFile']['name']);

    $fileName= $fileInfo['filename'];//获取文件名称
    $fileExt = $fileInfo['extension'];//获取后缀名称

    $targetPath =  $file_path.time().'.'.$fileExt;//重命名


	if (in_array($fileExt,$fileTypes)) {
		move_uploaded_file($tempFile,$targetPath);
		echo '上传成功';
	} else {
		echo '上传格式不正确';
	}
?>