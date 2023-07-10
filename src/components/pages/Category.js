import styles from './Category.module.css'

import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import SkeletonVinhoCard from '../vinhos/SkeletonVinhoCard'

import CategoryForm from '../categories/CategoryForm'
import Container from '../layout/Container'
import VinhoForm from '../vinhos/VinhoForm'
import VinhoCard from '../vinhos/VinhoCard'

import CategoryCard from '../categories/CategoryCard'
import SkeletonCategoryCard from '../categories/SkeletonCategoryCard'

function Category() {

    const { id } = useParams()

    const [category, setCategory] = useState([])
    const [allVinhos, setAllVinhos] = useState([])
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [showVinhoForm, setShowVinhoForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/categoria?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(resp => resp.json())
                .then((data) => {
                    setCategory(data)
                    setAllVinhos(data.vinhos)
                })
                .catch((err) => (console.log(err)))

        }, 500);
    }, [id])

    function updatePageData() {
        fetch(`http://localhost:5000/categoria?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setCategory(data)
                setAllVinhos(data.vinhos)
            })
            .catch((err) => (console.log(err)))

    }

    function removeVinho(id) {
        const formData = new FormData();
        formData.append('id', id);

        fetch(`http://localhost:5000/vinho?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'applicatin/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setAllVinhos(allVinhos.filter((Vinho) => Vinho.id !== id))
                toast.success('Categoria removida com sucesso.')
                updatePageData()
            })
            .catch(err => console.log(err))
    }

    function toggleCategoryForm() {
        setShowCategoryForm(!showCategoryForm)
    }

    function toggleVinhoForm() {
        setShowVinhoForm(!showVinhoForm)
    }

    function editPost(category) {

        const formData = new FormData();
        formData.append('id', category.id);
        formData.append('nome', category.nome);
        formData.append('pais', category.pais);
        formData.append('descricao', category.descricao);


        fetch("http://localhost:5000/categoria",
            {
                method: "PUT",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData,
            })
            .then((resp) => resp.json())
            .then((data) => {
                setCategory(data)
                toast.success('Categoria alterada com sucesso.')
                setShowCategoryForm(false)
            })
            .catch(err => console.log(err))


    }

    function createVinho(vinho) {

        const formData = new FormData();
        formData.append('categoria_id', category.id)
        formData.append('nome', vinho.nome);
        formData.append('uva', vinho.uva);
        formData.append('descricao', vinho.descricao);

        fetch("http://localhost:5000/vinho",
            {
                method: "POST",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData,
            })
            .then((resp) => resp.json())
            .then((data) => {
                toast.success('Vinho cadastrada com sucesso.')
                setShowVinhoForm(false)
                updatePageData()
                console.log(...formData)
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

                        <button className={styles.btn} onClick={toggleCategoryForm}>
                            {!showCategoryForm ? "Editar categoria" : 'Cancelar'}
                        </button>

                        {!category.nome ? <SkeletonCategoryCard cards={1} /> :
                            <CategoryCard
                                id={category.id}
                                nome={category.nome}
                                pais={category.pais}
                                descricao={category.descricao}
                                vinhos={(category.vinhos).length}
                                key={category.id}
                            />
                        }

                        {!showCategoryForm ?
                            (<div></div>

                            ) : (<div className={styles.category_info}>
                                <CategoryForm handleSubmit={editPost} btnText='Salvar' CategoryData={Category} />
                            </div>)
                        }
                    </div>

                    <div className={styles.right}>
                        <div>
                            <div className={styles.vinho_form_container}>
                                <h2>Vinhos na categoria</h2>
                                <button className={styles.btn} onClick={toggleVinhoForm}>
                                    {!showVinhoForm ? "Adicionar Vinho" : 'Cancelar'}
                                </button>
                                <div className={styles.category_info}>
                                    {showVinhoForm && (
                                        <VinhoForm handleSubmit={createVinho}
                                            textBtn={"Salvar"} />
                                    )}
                                </div>
                                <Container customClass="start">
                                    {category.nome ?
                                        (
                                            category.vinhos.length > 0 ?
                                                allVinhos.map((vinho) => (
                                                    <VinhoCard
                                                        id={vinho.id}
                                                        key={vinho.id}
                                                        nome={vinho.nome}
                                                        uva={vinho.uva}
                                                        descricao={vinho.descricao}
                                                        handleRemove={removeVinho}
                                                    />
                                                ))
                                                : (<p>Não há vinhos cadastradas.</p>)
                                        ) : (
                                            <SkeletonVinhoCard cards={4} />
                                        )}

                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className={styles.category_details}>
                <div className={styles.details_container}>
                    <div className={styles.category_name}>

                    </div>

                </div>

            </div >


        </motion.div>
    )
}

export default Category