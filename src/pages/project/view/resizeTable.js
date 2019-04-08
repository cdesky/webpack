import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import './resize.less';
import intl from 'react-intl-universal';

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

export default class ResizTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      columns: [{
        title: intl.get('lang2'),
        dataIndex: 'date',
        width: 200,
      }, {
        title: '数量',
        dataIndex: 'amount',
        width: 100,
      }, {
        title: '类型',
        dataIndex: 'type',
        width: 100,
      }, {
        title: '备注',
        dataIndex: 'note',
        width: 100,
      }, {
        title: '操作',
        key: 'action',
        render: () => (
          <a href="javascript:;">Delete</a>
        ),
      }],
    };
  }
  

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  data = [{
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  }, {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  }, {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  }];

  handleResize = index => (e, { size }) => {
    this.setState(({columns}) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const resCol = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <Table
        bordered
        components={this.components}
        columns={resCol}
        dataSource={this.data}
        pagination={false}
      />
    );
  }
}

