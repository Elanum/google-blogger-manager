import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {AuthConsumer} from "./GoogleAuth";
import Requests from "./Requests";
import {sortArray} from "../helper";

const SidenavUser = () => {
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = () => {
        Requests.getAllBlogs()
            .then(result => {
                if (result)
                    result.sort((a, b) => sortArray('string', a.name, b.name))
                setBlogs(result);
            })
            .catch((err) => {
                setError(err);
            });
    }

    useEffect(() => {
        getAllBlogs();
    }, []);

    return error ?
        <Redirect to={{pathname: "/error", state: error}}/> :
        (
            <AuthConsumer>
                {({logout, user}) => (
                    <div>
                        <li>
                            <div className="user-view deep-orange">
                                <img className="circle" src={user.image}
                                     alt="profile" referrerPolicy="no-referrer"/>
                                <span className="white-text name">{user.name}</span>
                                <span className="white-text email">{user.email}</span>
                            </div>
                        </li>
                        <li><Link to={"/"} className="sidenav-close"><i className="material-icons">home</i>Home</Link>
                        </li>
                        <li>
                            <div className="divider"/>
                        </li>
                        <li>
                            {// eslint-disable-next-line
                            }<a className="subheader">Blogs</a>
                        </li>
                        {blogs &&
                        blogs.map((blog) => (
                            // eslint-disable-next-line
                            <li key={blog.id}><Link to={{
                                pathname: `/blogs/${blog.id}`,
                                state: {
                                    blog: {...blog}
                                }
                            }} className="sidenav-close">{blog.name}</Link></li>
                        ))}
                        <li>
                            <div className="divider"/>
                        </li>
                        <li>
                            {// eslint-disable-next-line
                            }<a className="sidenav-close pointer" onClick={logout}>
                            <i className="material-icons">input</i>Logout
                        </a>
                        </li>

                    </div>
                )}
            </AuthConsumer>
        )
}

export default SidenavUser;