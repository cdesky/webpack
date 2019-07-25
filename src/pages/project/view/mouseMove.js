class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <span style={{ position: "absolute", left: mouse.x, top: mouse.y }}>
        跟着呢
      </span>
    );
  }
}

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  

  render() {
    return (
      <div style={{ height: 400 }} onMouseMove={this.handleMouseMove}>
        {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
            而不是提供鼠标>渲染的静态表示，而是使用“渲染”道具动态确定要渲染的内容。
          */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default class MutiRowSave extends Component {
  renderTheCat =(mouse) => {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        {/* render prop 是一个用于告知组件需要渲染什么内容的函数 prop。 */}
        <Mouse render={this.renderTheCat} /> 
      </div>
    );
  }
}
