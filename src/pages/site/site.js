 
import './site.less';  
import { DatePicker,Button ,Icon } from 'antd'; 
 
import Hellow from 'component/Hellow/Hellow';

export default class Site extends Component {
    render() {
        return (
            <div className='site'>
                this is site~ 
                <DatePicker />
                <Hellow />
                <Button type="danger">Danger</Button>
                <Icon type="up-circle" /> 
            </div>
        )
    }
}