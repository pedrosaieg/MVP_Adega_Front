import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import TextArea from '../form/TextArea'
import styles from './CompanyForm.module.css'

function CompanyForm({ handleSubmit, btnText, companyData }) {

    const [company, setCompany] = useState(companyData || [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(company)
        //console.log(company)
    }

    function handleChange(e) {
        setCompany({ ...company, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome da empresa" name="nome" placeholder="Insira o nome" handleOnChange={handleChange} value={company.nome ? company.nome : ''} />
            <Input type="text" text="Área de atuação" name="ramo_atuacao" placeholder="Insira a área de atuação" handleOnChange={handleChange} value={company.ramo_atuacao ? company.ramo_atuacao : ''} />
            <TextArea type="text" text="Descrição" name="sobre" placeholder="Insira uma descrição" handleOnChange={handleChange} value={company.sobre ? company.sobre : ''} />
            <Input type="url" text="Página Web" name="link" placeholder="Insira a url da página web" handleOnChange={handleChange} value={company.link ? company.link : ''} />
            <Input type="number" text="Funcionários" name="tamanho" placeholder="Insira o número de funcionários" handleOnChange={handleChange} value={company.tamanho ? company.tamanho : ''} />
            <div className={styles.buttons}>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default CompanyForm