import { Row, Col ,Upload,Button,Icon,message} from "antd";
import "./project.less";
import PickerColor from 'component/pickerColor/index'
import {Link} from 'react-router-dom';


 class Project extends Component {
 
  render() {
  
    let props = {
      name: 'uploadFile',
      action: '/php/upload.php',  //这个根据php的所在实际路径
      // headers: {  //自己可以添加token 啥的 
      //   authorization: 'authorization-text',
      //   token:'123456'
      // },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.response.success === true) {
          console.log('info',info) 
          message.success(info.file.response.data);
        } else if (info.file.response.success === false) {  
          message.error(info.file.response.data);
        }
      }
    };


    return (
      <div className="project">
        this is Project~
        <Icon type="step-forward" />
        <Row>
          <Col span={12}>col-1</Col>
          <Col span={12}>col-2</Col>
        </Row>
        <div className="box">
          <div className="left">ab</div>
          <div className="right">cd
        <Link to="/app/sit12/site">hehe</Link></div>
        </div>
        <PickerColor />
         <br/>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 上传1
          </Button>
        </Upload>
        <img src={require('assets/images/big.jpg')}/>
      </div>
    );
  }
}
 
export default Project