import React from 'react';

class Pagination extends React.Component {
    render() {
        const {page, onChangePagination, total_pages} = this.props
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-secondary m-2" disabled={page === 1}
                        onClick={() => {onChangePagination(page - 1)}}>Назад</button>
                <label>{page} из {total_pages}</label>
                <button type="button" className="btn btn-secondary m-2" disabled={page === total_pages}
                        onClick={() => {onChangePagination(page + 1)}}>Вперед</button>
            </div>
        );
    }
}

export default Pagination;