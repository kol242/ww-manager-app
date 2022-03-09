import { observer } from 'mobx-react'
import React from 'react'
import SignupStore from '../../../Stores/SignupStore'

const Country = observer(({ field, type }) => {
    return (
        <div className="signup-form__input">
            <label htmlFor="country">{field.label}</label>
            <input {...field.bind({ type }) }id="country" placeholder="Start typing..." list="country-list"/>
            <datalist id="country-list" name={field.name}>
                {SignupStore.countries.map(option => 
                    <option key={option.name} value={option.name}>{option.name}</option>)} 
            </datalist>
        </div>
    )
})

export default Country
