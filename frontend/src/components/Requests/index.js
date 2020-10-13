import React from 'react';
import './style.scss';

class RequestsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
        this.changeFilter = this.changeFilter.bind(this);
        this.selectRange = this.selectRange.bind(this);
    }
    componentDidMount() {
        let row = document.getElementsByTagName('tr');
        for (let i = 1; i < row.length; i++) {
            row[i].addEventListener('click', this.selectRange);
        }
    }
    changeFilter(e) {
        this.setState({
            searchValue: e.target.value
        })
    }
    selectRange() {
        alert('row selected');
    }
    render() {
        return (
            <div className='datatable'>
                <div className='datatable-upperPanel'>
                    <input id='filterInput' onChange={this.changeFilter} placeholder='Enter a filter: ' maxlength="90"></input>
                    {/* Search button - can be implemented if needed */}
                    {/* <button onClick={this.selectRange}><i className='fas fa-search'></i></button> */}
                </div>
                <div className='datatable-lowerPanel'>
                    <table>
                        <tr>
                            <th>
                                <p>Name</p>
                            </th>
                            <th>
                                <p>Type</p>
                            </th>
                            <th>
                                <p>Date Start</p>
                            </th>
                            <th>
                                <p>Date End</p>
                            </th>
                            <th>
                                <p>Reason</p>
                            </th>
                        </tr>
                        <tr>
                            <td>{this.state.searchValue}</td>
                            <td>exampleType</td>
                            <td>exampleDate</td>
                            <td>exampleDate</td>
                            <td>exampleReason</td>
                        </tr>
                        <tr>
                            <td>{this.state.searchValue}</td>
                            <td>exampleType</td>
                            <td>exampleDate</td>
                            <td>exampleDate</td>
                            <td>exampleReason</td>
                        </tr>
                    </table>
                </div>
            </div >
        )
    }
}

export default RequestsTable;