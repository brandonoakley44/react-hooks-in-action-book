
import data from "../../static.json";
import { useState, Fragment } from 'react'; //import fragment to wrap multiple elements
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const {bookables, sessions, days} = data;


export default function BookablesList () {
  
  const [ group, setGroup ] = useState("Kit");
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const [ bookableIndex, setBookableIndex ] = useState(0); // call useState and assign the returned state value and updater function to variables

  //Assign an array of unique group names to the groups variable:
  const groups = [ ...new Set(bookables.map(b => b.group))];    //In sets, values are unique

  //Assign the currently selected bookable to its own variable 
  const bookable = bookablesInGroup[bookableIndex];

  //Use a third tracked state value to hold if details are shown
  const [ hasDetails , setHasDetails ] = useState(false);

  // create the event handler for the Next button
  function nextBookable() {
    setBookableIndex(i => (i+1) % bookablesInGroup.length )
    //e.g: 3 % 7
    //remainder of 3 /7 is 3, since it went 0 times with 3 remainder so 3 % 7 = 3
  }

  function previousBookable() {
      setBookableIndex(i => (i - 1) % bookablesInGroup.length >= 0 ? (i - 1) % bookablesInGroup.length : (bookablesInGroup.length - 1))
  }

  return (
    <Fragment>
    <div>
        {/* Create dropdown list to show each group in bookables data */}
        <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}  // include an event handler to update selecte group
        >
            {groups.map((g, i) => (
                <option key={g} value={g}>{ g }</option>
            ))}
        </select>
        <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
            <li
            key={b.id}
            className={i === bookableIndex ? "selected" : null}   //use the state value when generating UI
            onClick={() => setBookableIndex(i)}    // use the updater function to change the value
            >
            <button
                className="btn"
            >
                {b.title}
            </button>
            </li>
        ))}
        </ul>
        <p>

        <button 
            className="btn"
            onClick={previousBookable}
            autoFocus
            >
                <FaArrowLeft />
                <span>Prev</span>
            </button>

            <button 
            className="btn"
            onClick={nextBookable}
            autoFocus
            >
                <FaArrowRight />
                <span>Next</span>
            </button>
        </p>
    </div>
    {/* New UI section for selected bookable details...Show the details only if a bookable is selected */}
    { bookable && (
        <div className="bookable-details">
            <div className="item">
                <div className="item-header">
                    <h2>
                        {bookable.title}
                    </h2>
                    <span className="controls">
                        <label>
                            <input
                            type="checkbox"
                            checked={hasDetails}
                            onChange={() => setHasDetails(has => !has) }
                            />
                            Show Details
                        </label>
                    </span>
                </div>
                <p>{bookable.notes}</p>
                {/* Show the details only if hasDetails is true */}
                {hasDetails && (
                    <div className="item-details">
                        <h3>Availability</h3>
                        <div className="bookable-availability">
                            <ul>
                                {/* Display a list of available days */}
                                {bookable.days
                                    .sort()
                                    .map(d => <li key={d}>{days[d]}</li>)
                                }
                            </ul>
                            <ul>
                                {/* Display a list of available sessions */}
                                {bookable.sessions
                                .map(s => <li key={s}>{sessions[s]}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )}
    </Fragment>
  );
}