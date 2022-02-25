import { observer } from 'mobx-react'
import WpFilterStore from '../../Stores/Workplaces/WpFilterStore'
// styles
import '../../Common/style/list.scss'
// components
import WorkplaceFilter from '../Workplaces/FilterWorkplace/WorkplaceFilter'
import Links from '../../Components/Workplaces/Links/Links'
import Modals from '../../Components/Workplaces/Modals'
import DataList from '../../Components/DataList'
import WorkplaceList from '../../Components/Workplaces/WorkplaceList'
import WorkPlaceStore from '../../Stores/Workplaces/WorkPlaceStore'
import WorkplaceSorter from '../../Components/Workplaces/Sorter/WorkplaceSorter'

const WorkPlaceList = observer(() => {
  return (
    <div className="main-container__list">
      <Modals />
      <div className="container">
        <h2>List of workplaces</h2>
        <div className="btn-wrapper">
          <Links />
          <WorkplaceSorter />
        </div>
        { WpFilterStore.filter ? <WorkplaceFilter /> : null }
        <DataList id='docId' dataset={WorkPlaceStore} items={WorkPlaceStore.items}
          render={item => <WorkplaceList
            id={item.docId} 
            name={item.name}
            description={item.descr}
            salary={item.salary}
            currency={item.currency} />
          } />  
      </div>
    </div>  
  )
})

export default WorkPlaceList
