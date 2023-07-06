import { toast } from 'react-toastify';
import CategoryForm from '../categories/CategoryForm'
import styles from './NewCategory.module.css'

import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

function NewCategory() {

    const navigate = useNavigate()

    function createPost(category) {

        const formData = new FormData();
        formData.append('nome', category.nome);
        formData.append('ramo_atuacao', category.ramo_atuacao);
        formData.append('sobre', category.sobre);
        formData.append('link', category.link);
        formData.append('tamanho', category.tamanho);

        fetch("http://localhost:5000/empresa",
            {
                method: "POST",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData,
            })
            .then((resp) => resp.json())
            .then((data) => {
                toast.success('Empresa cadastrada com sucesso.')
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <motion.div className={styles.newcategory_container}
            inition={{ width: 0 }}
            animate={{ width: "800px" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <h1>Cadastre empresa</h1>
            <p>Cadastre uma empresa para adicionar vinhos</p>
            <CategoryForm handleSubmit={createPost} btnText="Salvar" />
        </motion.div>
    )
}

export default NewCategory