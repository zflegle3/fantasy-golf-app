import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

function LeagueActivityList() {
    const {league, isLoading, isError, message} = useSelector((state) => state.leagueSelected)

    let listItemsAll;
    if (league.activity) {
        listItemsAll = league.activity.map((dataItem) =>
            <div key={uuidv4()} className="league-activity-item">
                <p>{dataItem.user}</p>
                <p>{dataItem.item} {dataItem.time}</p>
            </div>
        );
    } else {
        listItemsAll = <div>No league activity</div>;
    }


    return (
        <div className="league-activity-list">
            {listItemsAll}
        </div>
    );
}

export default LeagueActivityList;
