import React, {Component} from 'react';
import moment from "moment";

class Input extends Component {
    render() {
        let {name, label, error, type, onChange, placeholder, required, value} = this.props;
        if (type === 'datetime-local' && value) {
            value = moment(value).format("YYYY-MM-DDTkk:mm");
        }
        return (
            <div className="form-group">
                {label &&
                <label htmlFor="{name}">{label}</label>
                }
                <input type={type} value={value} onChange={onChange} id={name} name={name} className="form-control"
                       autoComplete="off" placeholder={placeholder} required={required} />
                <p><small/></p>
                {error && <div className="alert-danger">{error}</div>}
            </div>
        )
    }
}

Input.defaultProps = {
    type: "text",
    placeholder: "Input here",
    required: false
}

export default Input;
