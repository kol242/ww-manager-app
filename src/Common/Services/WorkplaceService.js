import WpCreateStore from '../../Stores/Workplaces/WpCreateStore'
import WpEditStore from '../../Stores/Workplaces/WpEditStore'
import WpDeleteStore from '../../Stores/Workplaces/WpDeleteStore'
import {db} from './firebase-config'
import { 
    collection, 
    addDoc, 
    getDocs,
    getDoc, 
    doc, 
    deleteDoc, 
    updateDoc, 
    query, 
    where,
    orderBy,
    limit,
    startAfter,
    endBefore,
    limitToLast, 
    documentId,
    FieldPath,
    writeBatch
} from 'firebase/firestore'
import WpFilterStore from '../../Stores/Workplaces/WpFilterStore'
import WorkPlaceStore from '../../Stores/Workplaces/WorkPlaceStore'

class WorkerService {
    constructor(){
        this.get()
        this.getNames()
    }

    create = async (data) => {
        try {
            const collectionRef = collection(db, "WorkPlaces")
            await addDoc(collectionRef, {
                Naziv: data.name,
                Opis: data.descr,
                Placa: data.salary,
            })
        } catch {
            WpCreateStore.createFailed()
        }
    }

    fetchSorter = () => {
        return WpFilterStore.sortingType
    }

    get = async () => {
        try {
            const sortData = await this.fetchSorter()
            const ref = query(collection(db, "WorkPlaces"), 
            orderBy(sortData.field, sortData.sorter), 
            limit(7))
            return getDocs(ref)
        } catch (e) {
            WorkPlaceStore.isGetFailed()
            console.error(e)
        }
    }
    
    getById = (id) => {
        return getDoc(doc(db, "WorkPlaces", id))
    }

    getByName = (docData) => {
        const q = query(collection(db, "WorkPlaces"), where("Naziv", "==", docData))
        return getDocs(q)
    }

    getNames = () => {
        const ref = collection(db, "WorkPlaces")
        return getDocs(ref)
    }

    update = async (data) => {
        try {
            const collectionRef = doc(db, "WorkPlaces", data.docId)
            await updateDoc(collectionRef, { 
                Naziv: data.name,
                Opis: data.descr,
                Placa: data.salary,
            })
        } catch {
            WpEditStore.editFailed()
        }
    }

    delete = async (id) => {
        try {
            const workplaceRef = doc(db, "WorkPlaces", id)
            const q = query(collection(db, "Workers"), where("IdRadnogMjesta", "==", id))
            const workersRef = await getDocs(q)
            const batch = writeBatch(db)
            workersRef.forEach(worker => {
                batch.delete(worker.ref)
            })
            await batch.commit()
            await deleteDoc(workplaceRef)
        } catch {
            WpDeleteStore.deleteFailed()
        }
    }

    nextPage = (lastData, sortingType) => {
        const ref = query(collection(db, "WorkPlaces"), 
        orderBy(sortingType.field, sortingType.sorter), 
        startAfter(lastData), limit(7))
        return getDocs(ref)   
    }

    prevPage = (firstData, sortingType) => {
        const ref = query(collection(db, "WorkPlaces"), 
        orderBy(sortingType.field, sortingType.sorter), 
        endBefore(firstData), 
        limitToLast(7))
        return getDocs(ref)
    }

    filterGet = (filterData) => {
        const ref = query(collection(db, "WorkPlaces"), 
        where(filterData.field, filterData.operator, filterData.data), 
        limit(7))
        return getDocs(ref)
    }

    filterNextPage = (filterData, lastData) => {
        const ref = query(collection(db, "WorkPlaces"), 
        where(filterData.field, filterData.operator, filterData.data), 
        startAfter(lastData), 
        limit(7))
        return getDocs(ref)   
    }

    filterPrevPage = (filterData, firstData) => {
        const ref = query(collection(db, "WorkPlaces"), 
        where(filterData.field, filterData.operator, filterData.data), 
        orderBy(documentId(FieldPath)), 
        endBefore(firstData), 
        limitToLast(7))
        return getDocs(ref)
    }
}

export default new WorkerService()