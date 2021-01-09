import React from 'react';
import {GenresArr} from './GenresArrayData'

export default class Genres extends React.PureComponent {
    render() {
        return (
            <div>
                {GenresArr.map(gen => {
                    return <div key={gen.id}>
                        <input type="checkbox" className="m-2" name="with_genres"
                               value={gen.id}
                               onChange={this.props.onChangeGenre}/>
                        <label>{gen.name}</label>
                    </div>
                })}
            </div>
        );
    }
}

