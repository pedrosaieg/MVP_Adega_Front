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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
        formData.append('ramo_atuacao', category.ramo_atuacao);
        formData.append('sobre', category.sobre);
        formData.append('link', category.link);
        formData.append('tamanho', category.tamanho);


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
        formData.append('cargo', vinho.cargo);
        formData.append('conhecimentos', vinho.conhecimentos);
        formData.append('descricao', vinho.descricao);
        formData.append('modalidade_contrato', vinho.modalidade_contrato);
        formData.append('modalidade_trabalho', vinho.modalidade_trabalho);
        formData.append('responsabilidades', vinho.responsabilidades);

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
            <div className={styles.category_details}>
                <div className={styles.details_container}>
                    <div className={styles.category_name}>
                        <h1>
                            {category.nome ? category.nome :
                                (<SkeletonTheme baseColor='#5e35b1' highlightColor='#7a5a8f'>
                                    <h4><Skeleton /></h4>
                                </SkeletonTheme>)
                            }
                        </h1>
                        <button className={styles.btn} onClick={toggleCategoryForm}>
                            {!showCategoryForm ? "Editar categoria" : 'Cancelar'}
                        </button>
                    </div>
                    {!showCategoryForm ?
                        (
                            category.nome ?
                                (
                                    <div className={styles.category_info}>
                                        <p><span>Área de atuação: </span>{category.ramo_atuacao}</p>
                                        <p><span>Descrição: </span>{category.sobre}</p>
                                        <p><span>Website: </span><a href={category.link}>{category.link}</a></p>
                                        <p><span>Funcionários: </span>{category.tamanho}</p>
                                        <p><span>Vinhos: </span>{(category.vinhos).length}</p>
                                    </div>
                                )
                                :
                                (
                                    <div className={styles.category_info}>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                    </div>
                                )
                        ) : (
                            <div className={styles.category_info}>
                                <CategoryForm handleSubmit={editPost} btnText='Salvar' CategoryData={Category} />
                            </div>
                        )
                    }
                </div>
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
                                            cargo={vinho.cargo}
                                            modalidade_trabalho={vinho.modalidade_trabalho}
                                            modalidade_contrato={vinho.modalidade_contrato}
                                            descricao={vinho.descricao}
                                            handleRemove={removeVinho}
                                        />
                                    ))
                                    : (<p>Não há vinhos cadastradas.</p>)
                            ) : (
                                <SkeletonVinhoCard cards={10} />
                            )}



                    </Container>
                </div>
            </div >


        </motion.div>
    )
}

export default Category