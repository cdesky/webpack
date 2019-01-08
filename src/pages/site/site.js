 
import './site.css';  
import { DatePicker,Button ,Icon } from 'antd'; 
 
import Hellow from 'component/Hellow/Hellow';

export default class Site extends Component {
    render() {
        return (
            <div className='site'>
                this is site1~ 
                <DatePicker />
                <Hellow />
                <Button type="danger">Danger</Button>
                <Icon type="up-circle" /> 
            </div>
        )
    }
}