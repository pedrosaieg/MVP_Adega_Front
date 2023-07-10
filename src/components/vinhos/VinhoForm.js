import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../categories/CategoryForm.module.css'
import TextArea from '../form/TextArea'

function VinhoForm({ handleSubmit, textBtn }) {

    const [vinho, setvinho] = useState({})

    function submit(e) {
        e.preventDefault()
        handleSubmit(vinho)
    }

    function handleChange(e) {
        setvinho({ ...vinho, [e.target.name]: [e.target.value] })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text"
                text="Nome"
                name="Nome"
                placeholder="Insira o nome do vinho"
                handleOnChange={handleChange}
            />
            <Input type="text"
                text="Uva"
                name="uva"
                placeholder="Uvas presentes no vinho"
                handleOnChange={handleChange}
            />
            <TextArea type="text"
                text="Descrição"
                name="descricao"
                placeholder="Descreva a vinho"
                handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn} />
        </form>
    )
}

export default VinhoForm