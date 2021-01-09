import React from "react";
import SortBy from "./SortBy/SortBy";
import Pagination from "./Pagination/Pagination";
import ReleaseYear from "./ReleaseYear/ReleaseYear";
import Genres from "./Genres/Genres";

export default class Filters extends React.Component {
    render() {
        const {
            filters: {sort_by, primary_release_year, with_genres},
            onChangeFilters,
            onChangePagination,
            page,
            total_pages,
            onChangeGenre
        } = this.props;
        return (
            <form className='mb-3'>
                <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters}/>
                <ReleaseYear primary_release_year={primary_release_year} onChangeFilters={onChangeFilters}  />
                <Genres with_genres={with_genres} onChangeFilters={onChangeFilters} onChangeGenre={onChangeGenre} />
                <Pagination page={page} total_pages={total_pages} onChangePagination={onChangePagination}/>
            </form>
        )
    }
}