import React from 'react'
import WpFilterStore from '../../../Stores/Workplaces/WpFilterStore'
import '../../../Common/style/sorter.scss'

function WorkplaceSorter() {
    const sorting = (e) => {
        e.preventDefault()
        const sorterType = e.target.value
        WpFilterStore.sorterType(sorterType)
    }

    return (
        <div>
            <select defaultValue={'default'} onChange={sorting} className="sorter" name="sorting" id="sorting">
                <option value="default" disabled>Sort...</option>
                <option value="nameAsc">A-Z</option>
                <option value="nameDesc">Z-A</option>
                <option value="salaryDesc">Salary from highest</option>
                <option value="salaryAsc">Salary from lowest</option>   
            </select>
        </div>
    )
}

export default WorkplaceSorter
