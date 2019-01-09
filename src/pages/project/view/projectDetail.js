import img from "assets/images/2.jpg";
  
export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

  componentDidMount(){ 
    
  }
 
  render() { 
    return (
      <div className="projectDetail">
        欢迎来到详情页~
        <img src={img} />
      </div>
    );
  }
}
