import { observer } from 'mobx-react'
import WorkerStore from '../Stores/WorkerStore'
import { Link } from 'react-router-dom'

const WorkersList = observer(() => {
    const deleteSelectedWorker = (id) => {
        WorkerStore.deleteWorker(id)
    }
    return (
      <>
      <div class="container w-50">
      <h1>Popis radnika</h1>
        <Link to="/new-worker"><button class="btn btn-success me-2">Dodaj radnika</button></Link>
        <Link to="/workplaces"><button class="btn btn-secondary">Radna mjesta</button></Link>
          {WorkerStore.workers.map((worker) => (
          <div>
            <br />
          <table class="table" key={worker.docId}>
            <tbody>
              <tr>
                <td>Ime:</td>
                <td>{worker.name}</td>
              </tr>
              <tr>
                <td>Prezime: </td>
                <td>{worker.lastName}</td>
              </tr>
              <tr>
                <td>Dob: </td>
                <td>{worker.age}</td>
              </tr>
              <tr>
                <td>Plaća: </td>
                <td>{worker.salary} Kn (neto)</td>
              </tr>
              <tr>
                <td>Pozicija: </td>
                <td>{worker.workPlace}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><button onClick={() => deleteSelectedWorker(worker.docId)} class="btn btn-danger me-2">Obriši</button> 
                <Link to='/edit-worker' 
                state={{
                  docId: worker.docId, 
                  name: worker.name,
                  lastName: worker.lastName,
                  age: worker.age,
                  salary: worker.salary,
                  workPlace: worker.workPlace
                  }}>
                  <button class="btn btn-primary">Uredi</button></Link>
                </td>
              </tr>
            </tfoot>
          </table>
          </div>    
          ))}
      </div>
        
      </>
    );
  })

export default WorkersList
