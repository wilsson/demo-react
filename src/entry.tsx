import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect} from 'react-redux';
import { store, fetchList } from './duck';
import axios from 'axios';

interface Props {
    name: string;
}

// component presentacional
const ComponentA: React.FC<Props> = ({ name }) => {
    return <div>ComponentA -- {name} </div>
};

interface State {
    count: number;
}

// component container
class ComponentB extends React.Component<{}, State> {
    state = {
        count: 0
    };
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    };
    render() {
        return <div>
            {this.state.count}
            <button onClick={this.handleClick}>
                click
            </button>
        </div>
    }
}

class Form extends React.Component<Props> {
    state = {
        name: ''
    };
    componentWillMount() {
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    handleChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };
    render() {
        return <form>
            {this.props.name}
            <input
                value={this.state.name}
                onChange={this.handleChange}
            />

            <button onClick={this.handleSubmit}>enviar</button>
        </form>
    }
}

const Counter = ({ count, handleIncrement }) => (
    <div>
        {count}
        <button onClick={() => {
            handleIncrement();
        }}>
        click
        </button>
    </div>
)

const CounterRedux = connect(
    state => ({
        count: state
    }),
    dispatch => ({
        handleIncrement: () => {
            dispatch({ type: 'INCREMENT'})
        }
    })
)(Counter);

interface Props {
    fetch: Function;
    data: any[];
}
class List extends React.Component<Props> {
    componentDidMount() {
        console.log('did');
        this.props.fetch();
    }
    render() {
        return <div>{JSON.stringify(this.props.data)}</div>
    }
}
const ListRedux = connect(
    state => {
        return {
            data: state.data,
        isFetching: state.isFetching,
        error: state.error
        }
    },
    dispatch => {
        return {
            fetch: () => {
                dispatch(fetchList());
            }
        }
    }
)(List);

const App = () => (
    <div>
        {/* <ComponentA name="wil"/>
        <ComponentB /> */}
        {/* <Form name="nameComponente"/> */}
        {/* <CounterRedux /> */}
        <ListRedux />
    </div>
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));