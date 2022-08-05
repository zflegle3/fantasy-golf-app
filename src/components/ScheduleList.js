import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); 

function ScheduleList(props) {
    //props.dataArray
    const [scheduleArray, setScheduleArray] = useState([]);

    const checkActive = (dataIn) => {
        if (Date.now()-dataIn.date.end.$date.$numberLong > 0) {
            return "schedule-item inactive-tournament";
        } else if (Date.now()-dataIn.date.end.$date.$numberLong > -432000000) {
            return "schedule-item active-tournament";
        } else {
            return "schedule-item";
        }
    }

    useEffect(() => { //Updating schedule data in case of missing vars
        let tempScheduleArray = props.dataArray;
        for (let i=0; i<tempScheduleArray.length;i++) {
            //replace missing purse
            if (!tempScheduleArray[i].purse) {
                tempScheduleArray[i].purse = {
                    $numberInt: "Unavailable"
                }
            }
            //replace missing Fedex Points
            if (!tempScheduleArray[i].fedexCupPoints) {
                tempScheduleArray[i].fedexCupPoints = {
                    $numberInt: "Unavailable"
                }
            }
        }
        setScheduleArray(tempScheduleArray);
      }, [props.dataArray]);


    let listItemsAll = scheduleArray.map((dataItem) => (
        <div key={uuidv4()} className={checkActive(dataItem)} >
            <div className={"schedule-item-content"}>
                <p>{dataItem.name}</p>
                <p>{`At ${dataItem.courses[0].courseName} in ${dataItem.courses[0].location.city}, ${dataItem.courses[0].location.state}, ${dataItem.courses[0].location.country}`}</p>
            </div>
            <div className={"schedule-item-status"}>
                <p>Live Now</p>
            </div>
            <div className={"schedule-item-dates"}>
                <p>{`${new Date(Number(dataItem.date.start.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric"})}`}</p>
                <p>{`${new Date(Number(dataItem.date.end.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric"})}`}</p>
            </div>
            <div className={"schedule-item-points"}>
                <p>{dataItem.fedexCupPoints.$numberInt}</p>
            </div>
            <div className={"schedule-item-purse"}>
                <p>{dataItem.purse.$numberInt}</p>
            </div>
        </div>)
    );
     
    return (
        <div className={"schedule-item-list"}>
            {listItemsAll}
        </div>
    );
}

export default ScheduleList;