import Header from "component/header/index";
import Sider from "component/Sider/index";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Header />
        <Sider />
      </div>
    );
  }
}

export default Index;
