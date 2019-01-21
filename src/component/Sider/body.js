import { Layout } from "antd";
const { Content } = Layout;
import history from "router/history";


class Body extends Component {
  constructor(props) {
    super(props);
  }

  ComponentDidMount(){
      
  }
 
  render() {
    return (
        <Content
        style={{
          margin: "10px",
          padding: "10px",
          background: "#fff",
          borderRadius: 4
        }}
      >
      {history.push(this.props.body)}
       
      </Content>
    );
  }
}

export default Body;
