import { Layout } from "antd";
import Header from "component/header/index";
import Sider from "component/Sider/index";
const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Header />
        <Layout style={{ height: "100%" }}>
          <Sider />
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
