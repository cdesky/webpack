import React, { Component } from 'react';

const asyncComponent = loadComponent => (

    class AsyncComponent extends Component {

        constructor(props){
            super(props);
            this.state = {
                Component: null
            };
            this.isUnMount = false;
        }

        

        componentWillUnmount() {
            this.isUnMount = true;
        }

        async componentWillMount() {

            if (this.hasLoadedComponent()) {
                return;
            }

            try {
                const module = await loadComponent();
                const Component = await module.default;
                
                if(!this.isUnMount) {
                    this.setState({
                        Component
                    })
                }
            }catch(e) {
                console.error(`未能异步加载 <AsyncComponent /> 组件`);
                throw e;
            }

          
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }

);

export default asyncComponent;
