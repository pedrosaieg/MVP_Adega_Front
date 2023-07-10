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
            <Input type="text" text="País" name="pais" placeholder="Insira o país relacionado" handleOnChange={handleChange} value={category.pais ? category.pais : ''} />
            <TextArea type="text" text="Descrição" name="descricao" placeholder="Insira mais informações sobre esta categoria" handleOnChange={handleChange} value={category.descricao ? category.descricao : ''} />
            <div className={styles.buttons}>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default CategoryForm