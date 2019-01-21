import { Icon, Button } from "antd";
import "./login.less";
import history from "router/history";
import menu from "router/menu";
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

  login() {
    $.post(
      "/php/test.php",
      {
        userName: $.trim($(".uName").val()),
        passWord: $.trim($(".pwd").val())
      },
      () => {
        // let menuRes = this.menuFirst(menu.data[0]);
        window.sessionStorage.setItem("menuList", JSON.stringify(menu.data));
        history.push("/IndexBody");
      }
    );
  }

  //登录成功后  跳转到 第一个导航栏目
  menuFirst(menu) {
    let url = null;
    for (const key in menu) {
      if (key === "children") {
        if (menu[key].length > 0) {
          menu[key] &&
            menu[key].map(val => {
              if (val.children.length) url = this.menuFirst(val.children[0]);
              else url = val.url;
            });
        }
      }
    }
    return url;
  }

  render() {
    return (
      <div className="login">
        <div className="input-fill-x">
          <input
            className="input-control input-fill uName"
            type="input"
            autoComplete="no"
            placeholder="用户名"
          />
          <label className="input-label">
            <Icon type="user" />
            用户名
          </label>
        </div>
        <div className="input-fill-x">
          <input
            className="input-control input-fill pwd"
            type="password"
            autoComplete="false"
            placeholder="密码"
          />
          <label className="input-label">
            <Icon type="lock" />
            密码
          </label>
        </div>
        <Button type="primary" block onClick={this.login.bind(this)}>
          登 录
        </Button>
      </div>
    );
  }
}

export default Login;
