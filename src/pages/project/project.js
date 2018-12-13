import { Row, Col } from "antd";
import "./project.less";
export default class Project extends Component {
  render() {
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
      </div>
    );
  }
}
