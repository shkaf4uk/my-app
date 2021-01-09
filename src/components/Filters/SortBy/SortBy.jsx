import React from 'react';
import {options} from './SortByArrData'


class SortBy extends React.PureComponent {
    render() {
        const {sort_by, onChangeFilters} = this.props
        return (
            <div>
                <div className='form-group'>
                    <label htmlFor="sort_by">Сорировать по:</label>
                    <select className='form-control' id="sort_by" name={"sort_by"}
                            value={sort_by}
                            onChange={onChangeFilters}>

                        {options.map(option => {
                            return <option key={option.value} value={option.value}>{option.label}</option>
                        })}

                    </select>
                </div>
            </div>
        );
    }
}

export default SortBy;