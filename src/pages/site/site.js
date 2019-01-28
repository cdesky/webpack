import "./site.css";
import { DatePicker, Button, Icon } from "antd";

import Project from "../project/project";

export default class Site extends Component {
  render() {
    return (
      <div className="site">
        this is site2~
        <DatePicker />
        <Button type="danger">Danger3</Button>
        <Icon type="up-circle" />
        <Project />
      </div>
    );
  }
}
