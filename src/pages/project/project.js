import { Row, Col ,Upload,Button,Icon,message} from "antd";
import "./project.less";

 class Project extends Component {
 
  render() {
  
    let props = {
      name: 'uploadFile',
      action: 'php/upload.php',
      // headers: {  //自己可以添加token 啥的 
      //   authorization: 'authorization-text',
      //   token:'123456'
      // },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };


    return (
      <div className="project">
        this is Project~
        <Icon type="step-forward" />
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <div className="box">
          <div className="left">1111</div>
          <div className="right">2222</div>
        </div>

         <br/>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 上传
          </Button>
        </Upload>
      </div>
    );
  }
}
 
export default Project