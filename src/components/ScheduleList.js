import { v4 as uuidv4 } from 'uuid';
uuidv4(); 

function ScheduleList(props) {
    //props.dataArray
    // console.log(props.dataArray);

    // let week = 0;


    // let test = props.dataArray[0];
    // if (test) {
    //     console.log(test);
    //     // let testDate = test.purse);
    //     // console.log(testDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric"}));
    //     console.log(typeof test.purse.$numberInt);
    // }


    const checkActive = (dataIn) => {
        if (Date.now()-dataIn.date.end.$date.$numberLong > 0) {
            return "schedule-item inactive-tournament";
        } else {
            return "schedule-item";
        }
    }


    let listItemsAll = props.dataArray.map((dataItem) =>
            <div key={uuidv4()} className={checkActive(dataItem)} >
                <div className={"schedule-item-content"}>
                    <p>{dataItem.name}</p>
                    <p>{`At ${dataItem.courses[0].courseName} in ${dataItem.courses[0].location.city}, ${dataItem.courses[0].location.state}, ${dataItem.courses[0].location.country}`}</p>
                </div>
                <div className={"schedule-item-dates"}>
                    <p>{`${new Date(Number(dataItem.date.start.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric"})}`}</p>
                    <p>{`${new Date(Number(dataItem.date.end.$date.$numberLong)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric"})}`}</p>
                </div>
                <div className={"schedule-item-points"}>
                    <p>{"420"}</p>
                </div>
                <div className={"schedule-item-purse"}>
                    <p>{"$69,000,000"}</p>
                </div>
            </div>
        );



        
    return (
        <div className={"schedule-item-list"}>
            {listItemsAll}
        </div>
    );
}

export default ScheduleList;