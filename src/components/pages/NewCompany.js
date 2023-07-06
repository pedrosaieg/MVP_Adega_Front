import { toast } from 'react-toastify';
import CompanyForm from '../companies/CompanyForm'
import styles from './NewCompany.module.css'

import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

function NewCompany() {

    const navigate = useNavigate()

    function createPost(company) {

        const formData = new FormData();
        formData.append('nome', company.nome);
        formData.append('ramo_atuacao', company.ramo_atuacao);
        formData.append('sobre', company.sobre);
        formData.append('link', company.link);
        formData.append('tamanho', company.tamanho);

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
        <motion.div className={styles.newcompany_container}
            inition={{ width: 0 }}
            animate={{ width: "800px" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <h1>Cadastre empresa</h1>
            <p>Cadastre uma empresa para adicionar vagas</p>
            <CompanyForm handleSubmit={createPost} btnText="Salvar" />
        </motion.div>
    )
}

export default NewCompany