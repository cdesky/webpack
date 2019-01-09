import { Row, Col ,Form,Upload,Button,Icon} from "antd";
import "./project.less";

 class Project extends Component {

  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

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


        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item
            {...formItemLayout}
            label="Upload"
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              // getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const _project =Form.create({ name: 'validate_other' })(Project)
export default _project