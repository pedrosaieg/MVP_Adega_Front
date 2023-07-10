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
        formData.append('pais', category.pais);
        formData.append('descricao', category.descricao);

        fetch("http://localhost:5000/categoria",
            {
                method: "POST",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData,
            })
            .then((resp) => resp.json())
            .then((data) => {
                toast.success('Categoria cadastrada com sucesso.')
                navigate('/categories')
            })
            .catch(err => console.log(err))
    }

    return (
        <motion.div
            inition={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className={styles.background}>
                <div className={styles.divider}>
                    <div className={styles.left} >
                    </div>

                    <div className={styles.right}>
                        <div>
                            <h1>Cadastre uma categoria</h1>
                            <p>Cadastre uma categoria para adicionar vinhos</p>
                            <CategoryForm handleSubmit={createPost} btnText="Salvar" />
                        </div>
                    </div>
                </div>
            </div>




        </motion.div>
    )
}

export default NewCategory