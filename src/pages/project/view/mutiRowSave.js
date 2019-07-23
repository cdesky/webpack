import {Form, InputNumber, Input, DatePicker, Button, Select, Icon} from 'antd';
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// import PageTitle from "component/page-title/PageTitle";
// import AppBreadcrumb from "component/breadcrumb/AppBreadcrumb";
// import './index.scss';

const FormItem = Form.Item;
const Option = Select.Option;

// 后台返回的数据格式
const formData = [
    {
        'field': 'jobid',
        'text': '工号',
        'errorMessage': '请输入工号',
        'required': true,
        'type': 'int',
        'value': 100
    }, {
        'field': 'date',
        'text': '日期',
        'errorMessage': '请输入日期',
        'required': false,
        'type': 'date',
        'value': '2017-10-20'
    }, {
        'field': 'username',
        'text': '用户名',
        'errorMessage': '请输入用户名',
        'required': true,
        'type': 'char',
        'value': 'hello world'
    }, {
        'field': 'customer',
        'text': '客户',
        'errorMessage': '请输入客户',
        'required': true,
        'type': 'select',
        'value': '中兴',
        'options': ['贝尔', '中兴', '烽火']
    }
];

// formItem css 样式
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    }
};

// 保存按钮 css 样式
// const tailFormItemLayout = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 14,
//             offset: 6,
//         },
//     }
// };

// form css 样式
// const formLayout = {
//     width: 400,
//     marginTop: 100,
//     marginLeft: 'auto',
//     marginRight: 'auto'
// };
let uuid = 0;

class MutiRowSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: true,
            formNumber: []
        };
        this.addForm = this.addForm.bind(this);
        this.removeForm = this.removeForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addForm() {
        const formDataObj = {};
        formDataObj['uuid' + uuid] = formData;
        this.state.formNumber.push(formDataObj);
        uuid++;
        this.setState({
            formNumber: this.state.formNumber
        });
    }

    removeForm(formArray) {
        if (this.state.formNumber.length === 1) {
            return;
        }
        this.setState({
            formNumber: this.state.formNumber.filter(item => item !== formArray)
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let suffixes =[];
        // const formDataList = [];
        this.props.form.validateFields((err, values) => {
            if (!err) {
                for (const key in values) {
                    if (values.hasOwnProperty(key)) {
                        values[key] = moment.isMoment(values[key]) ? values[key].format('YYYY-MM-DD') : values[key]
                        suffixes.push(key.split('_')[1]);
                        suffixes = Array.from(new Set(suffixes));
                    }
                }
                
            }
        });
        console.log('values:' + suffixes);
    }

    formDataFilter(formDataList, suffixes, values) {
        suffixes.forEach(function (item) {
            const formdataObj = {};
            for (const key in values) {
                if (values.hasOwnProperty(key) && key.indexOf(item)!==-1) {
                    formdataObj[key.split('_')[0]] = values[key];
                }
            }
            formDataList.push(formdataObj);
        })
        return formDataList;
    }
    /**
     * 根据后台返回的 data 中 type 类型生成不同的组件
     * @param item  json
     * @param Component
     */
    switchItem(item) {
        const type = item.type;
        switch (type) {
            case 'int':
                return <InputNumber style={{width: '100%'}}/>;
                break;
            case 'char':
                return <Input />;
                break;
            case 'date':
                return <DatePicker style={{width: '100%'}}/>;
                break;
            case 'select':
                return (
                    <Select>
                        {
                            item.options.map((option, index) => {
                                return (<Option key={index} value={option}>{option}</Option>)
                            })
                        }
                    </Select>
                );
            default:
                return <Input />;
                break;
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const dynamicForm = (
            <Form onSubmit={this.handleSubmit} className="form-layout">
                {/* {
                    this.state.formNumber.map((formArray, formIndex) => {
                        return (
                            <div key={'div_' + formIndex} className="form-number">
                                {
                                    this.state.formNumber.length > 1 ?
                                        <Button type="dashed" key={'btn_' + formIndex} onClick={() => this.removeForm(formArray)}>
                                            <Icon key={'icon_' + formIndex} type="close">删除此组form表单数据</Icon>
                                        </Button> : null
                                }
                                {
                                    Object.keys(formArray).map(key => {
                                        return (
                                            formArray[key].map((item, index) => {
                                                item.value = item.type === 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value;
                                                return (
                                                    <FormItem
                                                        key={formIndex + index}
                                                        {...formItemLayout}
                                                        label={item.text}
                                                        hasFeedback>
                                                        {getFieldDecorator(item.field + '_' + key, {
                                                            initialValue: item.value,
                                                            rules: [{
                                                                required: item.required,
                                                                message: item.errorMessage
                                                            }],
                                                        })(
                                                            this.switchItem(item)
                                                        )}
                                                    </FormItem>
                                                )
                                            })
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                } */}
                <div className="form-number">
                    <Button type="dashed" onClick={this.addForm}>
                        <Icon type="plus"/>添加一组数据
                    </Button>
                </div>
                <div className="form-number">
                    <Button type="primary" htmlType="submit">提交</Button>
                </div>
            </Form>
        );
        return (
            <div className="page-wrapper">
               
                {dynamicForm}
            </div>
        );
    };
}
const _MutiRowSave = Form.create()(MutiRowSave);
export default _MutiRowSave