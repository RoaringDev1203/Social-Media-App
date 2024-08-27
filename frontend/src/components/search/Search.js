import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../actions/searchActions';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(search(query));
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users and posts"
                />
                <button type="submit">Search</button>
            </form>
            <div>
                <h3>Users</h3>
                {results.users.map((user) => (
                    <div key={user._id}>
                        <h4>{user.username}</h4>
                    </div>
                    ))}
                    <h3>Posts</h3>
                    {results.posts.map((post) => (
                        <div key={post._id}>
                            <h4>{post.user.username}</h4>
                            <p>{post.content}</p>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
