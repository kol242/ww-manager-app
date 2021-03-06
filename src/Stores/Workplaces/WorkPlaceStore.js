import WpFilterStore from './WpFilterStore'
import WorkplaceService from '../../Common/Services/WorkplaceService'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'

class WorkPlaceStore {
    items = []
    names = []
    lastVisible = []
    firstVisible = []
    currencies = []

    nextLength = 7
    prevLength = 7

    constructor(){
        makeAutoObservable(this)
        this.getCurrencies()
    }

    getCurrencies = async () => {
        try {
            await axios.get(`https://openexchangerates.org/api/currencies.json`)
            .then(res => {
                const data = res.data
                for (const [key] of Object.entries(data)) {
                    this.currencies.push(key)
                }
            }) 
        } catch(err) {
            console.error(err)  
        }
    }

    pushDocs = (documentSnapshot) => {
        const docs = documentSnapshot.docs.slice(0,5)
        this.items = docs.map(doc => {
            return {
                docId: doc.id,
                name: doc.data().Naziv,
                descr: doc.data().Opis,
                salary: doc.data().Placa,
                currency: doc.data().Valuta
            }
        })
        this.lastVisible = docs[docs.length-1]
        this.firstVisible = docs[0]  
    }

    getWorkplaces = async () => {
        const documentSnapshot = await (
            WpFilterStore.filter ? WorkplaceService.filterGet(WpFilterStore.filterObj) 
            : WorkplaceService.get(WpFilterStore.sortingType))
        runInAction(() => {
            this.prevLength = null
            this.nextLength = documentSnapshot.docs.length
            this.pushDocs(documentSnapshot)
        })
    }
    
    getNames = async () => {
        const documentSnapshot = await WorkplaceService.getNames()
        runInAction(() => {
            this.names = documentSnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.data().Naziv
                }
            })
        })
    }

    prevPage = async () => {
        const documentSnapshot = await ( 
            WpFilterStore.filter ? WorkplaceService.filterPrevPage(WpFilterStore.filterObj, this.firstVisible) 
            : WorkplaceService.prevPage(this.firstVisible, WpFilterStore.sortingType))
        runInAction(() => {
            this.prevLength = documentSnapshot.docs.length
            if(this.nextLength < 7) {
                this.nextLength = 7
            }
            this.pushDocs(documentSnapshot)
        })
    }

    nextPage = async () => {
        const documentSnapshot = await ( 
            WpFilterStore.filter ? WorkplaceService.filterNextPage(WpFilterStore.filterObj, this.lastVisible) 
            : WorkplaceService.nextPage(this.lastVisible, WpFilterStore.sortingType))
        runInAction(() => {
            this.nextLength = documentSnapshot.docs.length
            if(this.prevLength < 7) {
                this.prevLength = 7
            }
            this.pushDocs(documentSnapshot)
        })
    }
}

export default new WorkPlaceStore()