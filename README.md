# webpack
demo

$raw_success = array('success' => true, 'data' => '上传成功');
	
	$raw_fail = array('success' => false, 'data' => '上传格式不正确');

	if (in_array($fileExt,$fileTypes)) {
		move_uploaded_file($tempFile,$targetPath);
		echo json_encode($raw_success);
	} else {
		echo json_encode($raw_fail);
	}