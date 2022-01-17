import { observer } from 'mobx-react'
import React from 'react'
import WorkPlaceStore from '../../../Stores/Workplaces/WorkPlaceStore'
import ListItem from './ListItem'

const List = observer(({currentData}) => {

    return (
        <div>
            <select className="form-select" name="workerPlace">
                <option defaultValue>{currentData.workPlace}</option>
                {WorkPlaceStore.names.map((work) => (
                    <ListItem key={work.id} keyItem={work.id} value={work.name} name="workerPlace"/>
                ))}
            </select> 
        </div>
    )
})

export default List
