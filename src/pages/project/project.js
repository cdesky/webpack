import { Row, Col, Upload, Button, Icon, message } from "antd";
import "./project.less";
import PickerColor from "component/pickerColor/index";
import { Link } from "react-router-dom";
import history from "router/history";
import intl from "react-intl-universal";

class Project extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount() {
    axios.post("/php/test.php", {});
  }


  jump = () => {
    var path = {
      pathname: "/app/sites/site",
      query: { id: 1, name: "3", age: 36 }
    };
    window.sessionStorage.setItem('currentUrl',path.pathname);
    history.push(path);
  };
  render() {
    let props = {
      name: "uploadFile",
      action: "/php/upload.php", //这个根据php的所在路径
      headers: {
        //自己可以添加token 啥的
        authorization: "authorization-text",
        token: "123456"
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.response&&info.file.response.success === true) {
          console.log("info", info);
          message.success(info.file.response.data);
        } else if (info.file.response&&info.file.response.success === false) {
          message.error(info.file.response.data);
        }
      }
    };

     
    var path = {
      pathname: "/app/sites/site",
      state :  { id: 3, name: "4", age: 29 }
    };
    
    return (
      <div className="project">
        this is Project~ 
        <Link to={path}>hehe</Link>
        <a href="javascript:;" onClick={this.jump} className='svg-wave'>
          这是个点击的地方
        </a>
        <Icon type="step-forward" />
        <Row>
          <Col span={12}>col-11</Col>
          <Col span={12}>col-22</Col>
        </Row>
        <div className="box">
          <div className="left">left</div>
          <div className="right">
            right
           
          </div>
        </div>
        <PickerColor />
        <br />
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> {intl.get("lang1")}
          </Button>
        </Upload>
        <img src={require("assets/images/2.jpg")} />
        <img src={require("assets/images/upload.png")} />
        <img src={require("assets/images/big.jpg")} />
      </div>
    );
  }
}

export default Project;
