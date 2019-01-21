import { Layout } from "antd";
import Header from "component/header/index";
import Sider from "component/Sider/index";
const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {}

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    console.log(this.props.data)
    return (
      <Layout style={{ height: "100%" }}>
        <Header toggle={() => this.toggle()} collapsed={this.state.collapsed} />
        <Layout style={{ height: "100%" }}>
          <Sider collapsed={this.state.collapsed} />
          <Content
            style={{
              margin: "10px",
              padding: "10px",
              background: "#fff",
              borderRadius: 4
            }}
          >
            aaa
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
