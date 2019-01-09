import { Row, Col ,Upload,Button,Icon} from "antd";
import "./project.less";

 class Project extends Component {
 
  render() {
  
    let props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      },
      
    };

    return (
      <div className="project">
        this is Project~
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <div className="box">
          <div className="left">1111</div>
          <div className="right">2222</div>
        </div>

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