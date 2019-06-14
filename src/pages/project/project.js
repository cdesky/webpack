import { Row, Col, Upload, Button, Icon, message ,Input} from "antd";
import "./project.less";
import PickerColor from "component/pickerColor/index";
import { Link } from "react-router-dom";
import history from "router/history";
import intl from "react-intl-universal";
const Search = Input.Search;

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

  search = (e) => {
    let content = document.getElementById("content");
    let contents = content.innerHTML;
    let text = e;
    let values = contents.split(text);
    content.innerHTML = values.join('<span style="background:red;">' + text + '</span>');
  }

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
        <Search
          id="text"
          placeholder="请输入关键字"
          onSearch={value =>
              this.search(value)
          }
          style={{ width: 200, marginRight: 10 }}
        /> 
        <div id="content">
          前端通常是指网站的表现层和结构层。因此前端技术一般分为前端设计和前端开发，前端设计一般可以理解为网站的视觉设计，前端开发则是网站的前台代码实现，现在最新的高级版本HTML5、CSS3，以及SVG等。
          HTML、CSS、JavaScript是前端开发中最基本也是最必须的三个技能。前端的开发中，在页面的布局时， HTML将元素进行定义，CSS对展示的元素进行定位，再通过JavaScript实现相应的效果和交互。虽然表面看起来很简单，但这里面需要掌握的东西绝对不会少。在进行开发前，需要对这些概念弄清楚、弄明白，这样在开发的过程中才会得心应手。
        </div>
        {/* <input type="text" id="text" placeholder="请输入关键字"/> */}
        
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
