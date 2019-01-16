import { Icon ,Button} from "antd";
import "./login.less";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
   

    // axios.get('/php/test.php',
    // {
    //   params:{
    //     userName:'111',
    //     pwd:'123456'
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  login(){
    $.post("/php/test.php",{
      userName:$.trim($('.uName').val()), passWord:$.trim($('.pwd').val())
    },(res)=>{
      console.log(res)
    });
  }

  render() {
    return (
      <div className="login">
        <div className="input-fill-x">
          <input className="input-control input-fill uName" placeholder="用户名" />
          <label className="input-label">
            <Icon type="user" />
            用户名
          </label>
        </div>
        <div className="input-fill-x">
          <input className="input-control input-fill pwd" placeholder="密码" />
          <label className="input-label">
            <Icon type="lock" />
            密码
          </label>
        </div>
        <Button type="primary" block onClick={this.login.bind(this)}>登 录</Button>
      </div>
    );
  }
}

export default Login;
