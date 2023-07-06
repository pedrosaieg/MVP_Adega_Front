import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import TextArea from '../form/TextArea'
import styles from './CategoryForm.module.css'

function CategoryForm({ handleSubmit, btnText, categoryData }) {

    const [category, setcategory] = useState(categoryData || [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(category)
        //console.log(category)
    }

    function handleChange(e) {
        setcategory({ ...category, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome da categoria" name="nome" placeholder="Insira o nome" handleOnChange={handleChange} value={category.nome ? category.nome : ''} />
            <Input type="text" text="Área de atuação" name="ramo_atuacao" placeholder="Insira a área de atuação" handleOnChange={handleChange} value={category.ramo_atuacao ? category.ramo_atuacao : ''} />
            <TextArea type="text" text="Descrição" name="sobre" placeholder="Insira uma descrição" handleOnChange={handleChange} value={category.sobre ? category.sobre : ''} />
            <Input type="url" text="Página Web" name="link" placeholder="Insira a url da página web" handleOnChange={handleChange} value={category.link ? category.link : ''} />
            <Input type="number" text="Funcionários" name="tamanho" placeholder="Insira o número de funcionários" handleOnChange={handleChange} value={category.tamanho ? category.tamanho : ''} />
            <div className={styles.buttons}>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default CategoryForm