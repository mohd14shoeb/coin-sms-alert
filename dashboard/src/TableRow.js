import React, {Component} from 'react';

class TableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            coin: props.coin,
            priceUsdThreshold: '',
            thresholdDirection: 'over'
        };


        this.handleSetAlarmClick = this.handleSetAlarmClick.bind(this);
        this.handleThresholdDirectionChange = this.handleThresholdDirectionChange.bind(this);
        this.handlePriceUsdThresholdChange = this.handlePriceUsdThresholdChange.bind(this);
    }

    componentDidMount() {
        this.setState({coin: this.props.coin});
    }

    handleThresholdDirectionChange(e) {
        this.setState({thresholdDirection: e.target.value});
    }

    handlePriceUsdThresholdChange(e) {
        this.setState({priceUsdThreshold: e.target.value});
    }

    handleSetAlarmClick() {
        let postData = {
            coinId: this.state.coin.id,
            priceUsdThreshold: parseFloat(this.state.priceUsdThreshold),
            thresholdDirection: this.state.thresholdDirection
        };

        fetch('/api/alarm', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(postData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    render() {
        if (!this.state.coin) return '';

        return (
            <tr>
                <td>{this.state.coin.name}</td>
                <td>{this.state.coin.price_usd}</td>
                <td>
                    <select onChange={this.handleThresholdDirectionChange}
                            value={this.state.thresholdDirection}>
                        <option value="over">over</option>
                        <option value="under">under</option>
                    </select>
                    <input onChange={this.handlePriceUsdThresholdChange}
                           placeholder="Set price threshold"
                           type="number"
                           step="0.01"
                           min="0"
                           value={this.state.priceUsdThreshold}/>
                    <button onClick={this.handleSetAlarmClick}>Set Alarm</button>
                </td>
            </tr>
        );
    }

}

export default TableRow;