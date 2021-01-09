import React from 'react';
import {options} from './ReleasedYearArrData';


export default class ReleaseYear extends React.PureComponent {
    render() {
        const {primary_release_year, onChangeFilters} = this.props;
        return (
            <div className="form-group">
                <label>По дате выпуска:</label>
                <select name="primary_release_year" className="form-control" value={primary_release_year}
                        onChange={onChangeFilters}>
                    {options.map(year => {
                       return <option key={year.value} value={year.value}>{year.label}</option>
                    })}
                </select>
            </div>
        );
    }
}

