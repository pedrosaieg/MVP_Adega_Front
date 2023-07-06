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
                text="Cargo"
                name="cargo"
                placeholder="Insira o nome do cargo"
                handleOnChange={handleChange}
            />
            <TextArea type="text"
                text="Descrição"
                name="descricao"
                placeholder="Descreva a vinho"
                handleOnChange={handleChange}
            />
            <Input type="text"
                text="Modalidade de contratação"
                name="modalidade_contrato"
                placeholder="PJ/CLT"
                handleOnChange={handleChange}
            />
            <Input type="text"
                text="Modalidade de trabalho"
                name="modalidade_trabalho"
                placeholder="Presencial/Híbrido/Remoto"
                handleOnChange={handleChange}
            />
            <Input type="text"
                text="Conhecimentos"
                name="conhecimentos"
                placeholder="Conhecimentos desejáveis"
                handleOnChange={handleChange}
            />
            <Input type="text"
                text="Responsabilidades"
                name="responsabilidades"
                placeholder="Principais responsabilidades do cargo"
                handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn} />
        </form>
    )
}

export default VinhoForm