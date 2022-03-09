import { observer } from 'mobx-react'
import React from 'react'

const Input = observer(({ field, type }) => {
    return (
        <div className="form-input">
            <label htmlFor={field.name}>{field.label}</label>  
            <input 
                {...field.bind({ type }) }
                name={field.name}
            />
            <p className="input-error">{field.error}</p>
        </div>
    )
})

export default Input

