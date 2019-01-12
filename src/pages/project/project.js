import { Row, Col ,Upload,Button,Icon,message} from "antd";
import "./project.less";

 class Project extends Component {
 

  up(){
    axios.post('../../../php/upload.php')
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })

    
  }

  render() {
  
    let props = {
      name: 'file',
      action: '../../../php/upload.php',
      headers: {
        authorization: 'authorization-text',
      },
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

        <form action='../../../php/upload.php' datatype="multipart/form-data" >
          <input type='file' name='files' onChange={this.up.bind(this)}/>
        </form>
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