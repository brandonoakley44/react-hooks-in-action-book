import data from "../../static.json";
import { useState, Fragment } from "react";
const { users } = data; //destructure users from data

export default function UsersList() {
    const [ userIndex, setUserIndex ] = useState(0);
    const [ userHasDetails, setUserHasDetails ] = useState(false);

    const user = users[userIndex];

    //Determine what user is being displayed

    //return the jsx and map thru the data
    return (
        <Fragment>
            <div>
                <ul className="bookables items-list-nav">
                    {users.map((u,i) => (
                        <li
                        key={u.id}
                        className={ i === user ? "selected" : null }
                        onClick={() => setUserIndex(i) }
                        >
                        <button
                        className="btn"
                        >
                            { u.name }
                        </button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* New UI section for selected user details. Show the details only if a user is selected */}
            { user && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>{ user.name }</h2>
                            <span className="controls">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={userHasDetails}
                                        onChange={() => setUserHasDetails(has => !has)}
                                    />
                                    Show Details
                                </label>
                            </span>
                        </div>
                        <p>{ user.title }</p>
                        {/* Show the details only if userHasDetails is true */}
                        { userHasDetails && (
                            <div className="item-details">
                                <h3>Availability</h3>
                                <div className="bookable-availability">
                                    <p>{ user.notes }</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </Fragment>
    );
}   